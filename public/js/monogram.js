// todo puyih: cleanup

let $apronTextInput = $('#MonoText');
let $apronTextElement = $('#curve-badge');

let $apronThumbs = $('.apron_thumbs');
let $stencilSelect =  $("#stencilDrop");
let $fontSelect = $("#fontFamilyDrop");

let $optionTextColor = $('#font-color-picker');
let $optionStencilColor = $('#stencil-color-picker');
let $stencilImg = $('#stencilImg');

// default settings

let currentFont = null;
let currentFontSize = null;
let currentFontColor = null;
let currentFontOpacity = null;




//dark and light for now
let currentApronColor =  'light'


$(document).ready(function () {

    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });

    //set the apron text arc
	$apronTextElement.show().arctext({radius: 230});

    initializeValues();
    setupOptionsEventHandlers();

    $stencilSelect.selectmenu();
    $fontSelect.selectmenu();
});

function initializeValues(){
    //product section
    $("#MonoText").val("BON APPETIT");        
}


/********************************* 
    EVENT HANDLERS
**********************************/
function setupOptionsEventHandlers(){
    $apronTextInput.on('keyup', updateText);
    $apronThumbs.on("click", updateApronColor);
    $stencilSelect.on("selectmenuchange", updateStencilFigure); //jquery ui selectmenu event
    $fontSelect.on("selectmenuchange", updateFontFamily); //jquery ui selectmenu event
    $optionTextColor.on('click', '.color-option', updateFontColor );
    $optionStencilColor.on('click', '.color-option2', updateStencilColor);
}

// function updateText(){
//     $('.badge-text h2').remove()
//     $('.badge-text').append('<h2 id="curve-badge"></h2>');
//     $('.badge-text h2').text($("#MonoText").val().toUpperCase());
//     $('.badge-text h2').arctext({ radius: 180 });
//     $('#curve-badge').css('font-family',currentFont);
//     $('#curve-badge').css('color',currentFontColor);  
// }

function updateText(){
    $('textPath').text($("#MonoText").val().toUpperCase());
    $('#curve-badge').css('font-family',currentFont);
    $('#curve-badge').css('color',currentFontColor);  
}

function updateApronColor(e){

    if($(e.target).hasClass('dark')) {
        currentApronColor = 'dark';
    }
    if($(e.target).hasClass('light')) {
        currentApronColor = 'light';
    }


    $(".apron-background img").attr("src", $(e.target).attr("src"));

    updateApronTextOpacity();

    updateApronTextPath();
}

function updateStencilFigure(){

    var val = $stencilSelect.val();
    var image = $stencilImg.get(0);
    
    switch (parseInt(val)) {
        case 1:
            image.src='public/images/stencil1.png'
            break;
        case 2:
            image.src='public/images/stencil2.png'
            break;
        case 3:
            image.src='public/images/stencil3.png'
            break;
        case 4:
            image.src='public/images//stencil4.png'
            break;
        case 5:
            image.src='public/images/stencil5.png'
            break;
    
        default:
            break;
    }

    
}

function updateFontFamily(){

    let val = $fontSelect.val();
    debugger;
    
    switch(val) {
        case "font1":
            currentFont = "'Special Elite', cursive";
            currentFontSize = '24px';
            break;

        case "font2":
            currentFont = "Pangolin, cursive";
            currentFontSize = '24px';
            break;

        case "font3":
            currentFont = "Sofia";
            currentFontSize = '20px';
            break;

        case "font4":
            currentFont = "'Leckerli One', cursive";
            currentFontSize = '22px';     
            break;
            
        case "font5":
            currentFont = "mufferaw_rg";
            currentFontSize = '24px';
            break;       
    
        default:
            break;
    }

    $('.badge-text2 text').css({'font-family' : currentFont, 'font-size' : currentFontSize});  
}

function updateFontColor(e){

    currentFontColor = $(e.target).data().color;

    $('.badge-text2 text').css('fill',currentFontColor);
    $('.badge-text2 text').css('text-shadow', "0 0 15px " + currentFontColor);
  

    // $('.badge-text2 text').css('filter', `opacity(0.5) drop-shadow(${currentFontColor} 0px 0px 0px)`);
    // $stencilImg.css('background-color', selectedColor);
    // $('.badge-text2 text').css('-webkit-filter', `opacity(0.5) drop-shadow(${currentFontColor} 0px 0px 0px)`);

    //update mix-blend-mode property 
    switchBlendMode(e.target);   
}

function updateStencilColor(e){
    var selectedColor = $(e.target).data().color;
    $stencilImg.css('filter', `opacity(0.3) drop-shadow(${selectedColor} 0px 0px 0px)`);
    // $stencilImg.css('background-color', selectedColor);
    $stencilImg.css('-webkit-filter', `opacity(0.3) drop-shadow(${selectedColor} 0px 0px 0px)`);

    switchBlendModeStencil(e.target);
}

function switchBlendMode( selectedOption ){
    
    if( $( selectedOption ).hasClass('overlay')) {
    
        if($(".badge-text2").css('mix-blend-mode') !== 'overlay') {
            $(".badge-text2").css('mix-blend-mode', 'overlay');
        }   
    } 
    else /* option does not have class overlay */
    {
        if ($(".badge-text2").css('mix-blend-mode') === 'overlay' ) {
            $(".badge-text2").css('mix-blend-mode', 'screen ')
        }
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


function updateApronTextOpacity(){
    if (currentApronColor === 'dark'){
        $('.badge-text2').css('opacity', .15);
    }
    else if (currentApronColor === 'light'){
        $('.badge-text2').css('opacity', .30);
    }
}

function updateApronTextPath(){

    if (currentApronColor === 'dark'){
        $('#curve').attr('d', "M 130 237 L 160 237 C 300 210 270 237 320 245 L 330 245");
    }
    else if (currentApronColor === 'light'){
        $('#curve').attr('d', "M 130 235 L 160 235 C 300 210 270 230 325 240 L 320 245");
    }
}
