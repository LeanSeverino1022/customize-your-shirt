



// todo puyih: cleanup
$(document).ready(function () {

    // debugging stuff
    jQuery.get(`https://everthreadapi.com/calibration/preview2.php?r5d=54&augmentID=2223&format=NOTbase64&patternID=1&isThumb=0&color1=&color2=&color3=&color4=&scaleSize=1&isr=1&angle=1&o1=1-${2}&o6=6-1&o${7}=${7}-${1}`).fail(function(jqXHR, textStatus, errorThrown) {
        
     // do something, maybe?
     console.error( "error:");
       }).done(function(image){
           return;
        productImage.attr('src', $(image).attr('src'));
       })


// default settings

let currentFont = null;
let currentFontSize = null;
let selectedFontColor = null;
let currentFontOpacity = null;



//dark and light for now
let currentApronColor =  'light'


$(document).ready(function () {

    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });

    

    initializeValues();
    setupOptionsEventHandlers();

    // $("#stencilDrop").selectmenu();
    // $("#fontFamilyDrop").selectmenu();
});

function initializeValues(){
    //product section
    $("#MonoText").val("BON APPETIT");        
}


/********************************* 
    other EVENT HANDLERS
**********************************/
// MAIN APRON CUSTOMIZATION EVENT HANDLERS
function setupOptionsEventHandlers(){
    $('#MonoText').on('keyup', updateText);
    $('.apron_thumbs').on("click", "[data-target='o1']" ,updateApronColor);
    $("#stencilDrop").on("change", updateStencilFigure); //jquery ui selectmenu event
    $('#stencil-color-picker').on('click', updateStencilColor);
    
    $("#fontFamilyDrop").on("change", updateFontFamily); //jquery ui selectmenu event
    $('#font-color-picker').on('click', '.color-option', updateFontColor );
}



function updateText(){
    $('textPath').text($("#MonoText").val().toUpperCase());
    $('#curve-badge').css('font-family',currentFont);
    $('#curve-badge').css('color',selectedFontColor);  
}

function updateApronColor(e){

    //if option is already current
    if ($(e.target).hasClass('active')) return;

    $("[data-target='o1'].active").removeClass('active');

    $(e.target).addClass('active');

    return optionsRequest(jQuery);


}

function updateStencilFigure(){
 


    return optionsRequest(jQuery);
    
}

function updateFontFamily(){

    let val = $("#fontFamilyDrop").val();
    

    var letterSpacing = 'normal';
    var fontWeight = 'normal';
    
    switch(val) {
        case "font1":
            currentFont = "CC_wild_words_roman";
            currentFontSize = '22px';
            letterSpacing = "-1px";
             /* done */
            break;

        case "font2":
            currentFont = "Blambot";
            currentFontSize = '16px';
            // letterSpacing = "-1px";
                    /* done */
            break;

        case "font3":
            currentFont = "Coopbl";
            currentFontSize = '19px';
            
            // done
            
            break;

        case "font4":
            currentFont = "Extra_Grotesque";
            currentFontSize = '15px'; 
               /* done */
            break;
            
        case "font5":
            // todo: change to vladimir later
        currentFont = "Vladimir";
        currentFontSize = '19px';
        letterSpacing: '1.5px';
        fontWeight = 'bold';
        //  letterSpacing = "-1px";
            break;       
    
        default:
            break;
    }

    $('.badge-text2 text').css(
        {
            'font-family' : currentFont, 
            'font-size' : currentFontSize,
            'letter-spacing' : letterSpacing,
            'font-weight' : fontWeight
        });  
}

function updateFontColor(e){

    if ($(e.target).hasClass('active')) return;

    $("#font-color-picker > .color-option.active").removeClass('active');
    $(e.target).addClass('active');
    
    selectedFontColor = $(e.target).data().color;

    $('.badge-text2 text').css('fill',selectedFontColor);

    adjustFontSetting(e.target);   
}

function updateStencilColor(e){
    
    //if option is already current
    if ($(e.target).hasClass('active')) return;

    $("#stencil-color-picker > .stencil.color-option.active").removeClass('active');

    $(e.target).addClass('active');

    var selectedColor = $(e.target).data().color;
    

    return optionsRequest(jQuery);

    // switchBlendModeStencil(e.target);
}

function adjustFontSetting( selectedOption ){

    
    if( $( selectedOption ).data().color === "#0f0f0f" ||
        $( selectedOption ).data().color === "#774B3A" ) 
    {
    
        $(".badge-text2 text").css('opacity', '.60');
    } 
    else 
    {
        
        $(".badge-text2 text").css('opacity', '.29')
    }
}

function switchBlendModeStencil( selectedOption ){
    
    if( $( selectedOption ).hasClass('black')) {
    
        if($("#stencil").css('mix-blend-mode') !== 'multiply') {
            $("#stencil").css('mix-blend-mode', 'multiply');
        }   
    } 
    else 
    {
        if ($("#stencil").css('mix-blend-mode') !== 'overlay' ) {
            $("#stencil").css('mix-blend-mode', 'overlay')
        }
    }
}













let xhr = null;
const productImage = $('#product-image');

    // abortableWhen function
    // This function will create a $.when function whose requests are abortable
    // in the event of request spamming
    function abortableWhen($, xhrs) {
        return {
            abort: () => {
                xhrs.map(request => request.abort());
            },

            // Return $.when as a promise.
            // $.when waits for all the requests to finish before continuing
            promise: $.when(
                ...xhrs
            )
        };
    }

// OPTIONS REQUEST TEMPLATE
let optionsRequest = function ($) {

    var showApronTextImage = false;
    var apronImageURL = null;

    var o1 = $("[data-target='o1'].active").data().color; 
    var stencilColor = $(".stencil.color-option.active").data().color; 
    var selectedStencil = $("#stencilDrop").val();
    var stencilEnum= {
        BBQ: 7,
        BURGER: 8,
        COW: 9,
        CHICKEN_OR_CORKSCREW: 10
    };

    var stencilNum = stencilEnum.BBQ;

    
    switch (selectedStencil) {
        case "bbq":
            stencilNum = stencilEnum.BBQ;
            console.log('BBQ');
            
            break;
        case "hamburger":
            stencilNum = stencilEnum.BURGER;
            console.log('burger')
            break;
        case "cow":
            stencilNum = stencilEnum.COW;
             console.log('cow')
            break;
   
        default: /* case 10 */
            stencilNum = stencilEnum.CHICKEN_OR_CORKSCREW;
            console.log('chicken or corkscrew')
            break;
    }


    //option #10 11-20 is rooster and while option #10, option values 1-10 is for corkscrew
        if( selectedStencil == "rooster" ) stencilColor += 10;


        var apronImageURL = showApronTextImage ? `https://everthreadapi.com/calibration/preview2.php?r5d=54&augmentID=2223&format=NOTbase64&patternID=1&isThumb=0&color1=&color2=&color3=&color4=&scaleSize=1&isr=1&angle=1&o1=1-${o1}&o5=5-3&o${stencilNum}=${stencilNum}-${stencilColor}`
                                     : `https://everthreadapi.com/calibration/preview2.php?r5d=54&augmentID=2223&format=NOTbase64&patternID=1&isThumb=0&color1=&color2=&color3=&color4=&scaleSize=1&isr=1&angle=1&o1=1-${o1}&insertfontqueryhere&o${stencilNum}=${stencilNum}-${stencilColor}`


    // if a request already exists, then abort it to avoid spamming
    // and response overlap.
    if (xhr)
        xhr.abort();

    //  Create the request
    //  THESE ARE THE REQUEST, YOU'LL HAVE TO MAKE THE CHANGES HERE
    xhr = abortableWhen(jQuery, [
        // jQuery.get(`https://everthreadapi.com/calibration/preview2.php?r5d=54&augmentID=2205&format=NOTbase64&patternID=1&isThumb=0&color1=&color2=&color3=&color4=&scaleSize=1&isr=1&angle=1&${constructQueryString([o1, o2, o3, o4, o5, o6])}`),
        jQuery.get(apronImageURL).fail(function(jqXHR, textStatus, errorThrown) {
           
        // do something, maybe?
        console.error( "error:");
          }),
    ]);


     return xhr.promise.done(image => {

        productImage.attr('src', $(image).attr('src'));

        xhr = null;

        return true;
    })
    .catch(error => {
        console.log('error', error);


        return true;
    });


}; 

let constructQueryString = function (optionsArray) {
    return optionsArray.filter(option => option)
        .map((val, idx) => `o${idx + 1}=${idx + 1}-${val}`)
        .join('&');
};


// $(document).on("newMessage", newMessageHandler);

// APRON color picker
});