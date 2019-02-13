
ENUM_APRON_COLOR = {
    'GREY': 1,
    'BLACK': 2,
}

// todo puyih: cleanup
$(document).ready(function () {



    // set the default apron settings
    let apron = {
        color: $('.apron-option.active').data().color, //selected by user
        stencilColor: $('.color-option.active', '#stencil-color-picker').data().color, //selected by user
        textColor: $('.color-option.active', '#font-color-picker').data().color, //selected by user
        textFont: "Extra_Grotesque", //selected by user
        textFontSize: null, //dependent on the textFont

        updateApronText: function () { $('textPath').text($("#MonoText").val().toUpperCase()) },

        setupEventListeners: function () {
            $('#MonoText').on('keyup', apron.updateApronText);
            $('.apron_thumbs').on("click", ".apron-option", updateApronColor);
            $("#stencilDrop").on("change", updateStencilFigure); //jquery ui selectmenu event
            $('#stencil-color-picker').on('click', '.color-option', updateStencilColor);

            $("#fontFamilyDrop").on("change", updateFontFamily); //jquery ui selectmenu event
            $('#font-color-picker').on('click', '.color-option', updateFontColor);
        },

    }


    $(".nav-tabs a").click(function () {
        $(this).tab('show');
    });



    initializeValues();
    apron.setupEventListeners();


    //dark and light for now
    // let currentApronColor =  'light'




    function initializeValues() {
        //product section
        $("#MonoText").val("BON APPETIT");
    }

    function updateApronColor(e) {

        if ($(e.target).hasClass('active')) {
            return;
        }

        //render
        $(".apron-option.active").removeClass('active');
        $(e.target).addClass('active');

        //update value
        apron.color = $('.apron-option.active').data().color;

        //update rendered apron color
        $(".apron-background img").attr("src", $(e.target).attr("src"));

        //update text advanged properties


        if (apron.color === ENUM_APRON_COLOR.BLACK) {

            $('#stencilImg').css('filter', `opacity(0.08) drop-shadow(${apron.stencilColor} 0px 0px 0px)`);
            // $stencilImg.css('background-color', apron.stencilColor);
            $('#stencilImg').css('-webkit-filter', `opacity(0.08) drop-shadow(${apron.stencilColor} 0px 0px 0px)`);
        }
        else if (apron.color === ENUM_APRON_COLOR.GREY) {
            $('#stencilImg').css('filter', `opacity(0.18) drop-shadow(${apron.stencilColor} 0px 0px 0px)`);
            // $stencilImg.css('background-color', apron.stencilColor);
            $('#stencilImg').css('-webkit-filter', `opacity(0.18) drop-shadow(${apron.stencilColor} 0px 0px 0px)`);


        }




        // updateApronTextPath();


    }

    function updateStencilFigure() {

        var val = $("#stencilDrop").val();
        var image = $('#stencilImg').get(0);

        switch (parseInt(val)) {
            case 1:
                image.src = 'public/images/stencil1.png'
                break;
            case 2:
                image.src = 'public/images/stencil2.png'
                break;
            case 3:
                image.src = 'public/images/stencil3.png'
                break;
            case 4:
                image.src = 'public/images//stencil4.png'
                break;
            case 5:
                image.src = 'public/images/stencil5.png'
                break;

            default:
                break;
        }


    }

    function updateFontFamily() {

        let val = $("#fontFamilyDrop").val();


        var letterSpacing = 'normal';
        var fontWeight = 'normal';

        switch (val) {
            case "font1":
                apron.textFont = "CC_wild_words_roman";
                apron.textFontSize = '22px';
                letterSpacing = "-1px";
                /* done */
                break;

            case "font2":
                apron.textFont = "Blambot";
                apron.textFontSize = '16px';
                // letterSpacing = "-1px";
                /* done */
                break;

            case "font3":
                apron.textFont = "Coopbl";
                apron.textFontSize = '19px';

                // done

                break;

            case "font4":
                apron.textFont = "Extra_Grotesque";
                apron.textFontSize = '15px';
                /* done */
                break;

            case "font5":
                // todo: change to vladimir later
                apron.textFont = "Vladimir";
                apron.textFontSize = '19px';
                letterSpacing: '1.5px';
                fontWeight = 'bold';
                //  letterSpacing = "-1px";
                break;

            default:
                break;
        }

        $('.badge-text2 text').css(
            {
                'font-family': apron.textFont,
                'font-size': apron.textFontSize,
                'letter-spacing': letterSpacing,
                'font-weight': fontWeight
            });

        adjustApronTextPos();
    }

    function adjustApronTextPos() {
        //change to case
        if (apron.textFont === "CC_wild_words_roman") {
            $('.badge-text2').css('top', "-242px");
        } else {
            $('.badge-text2').css('top', "-247px");
        }
    }

    function updateFontColor(e) {


        if ($(e.target).hasClass('active')) return;

        $("#font-color-picker > .color-option.active").removeClass('active');
        $(e.target).addClass('active');

        apron.textColor = $(e.target).data().color;

        $('.badge-text2 text').css({
            'fill': apron.textColor,
            'text-shadow': "0 0 2px " + apron.textColor,
            'stroke': apron.textColor,
            'stroke-opacity': .5
        });

    }

    function updateStencilColor(e) {
        //if option is already current
        if ($(e.target).hasClass('active')) return;

        $("#stencil-color-picker > .stencil.color-option.active").removeClass('active');
        $(e.target).addClass('active');

        apron.stencilColor = $(e.target).data().color;


        if (apron.color === ENUM_APRON_COLOR.GREY) {


            $('#stencilImg').css('filter', `opacity(0.18) drop-shadow(${apron.stencilColor} 0px 0px 0px)`);
            // $stencilImg.css('background-color', apron.stencilColor);
            $('#stencilImg').css('-webkit-filter', `opacity(0.18) drop-shadow(${apron.stencilColor} 0px 0px 0px)`);

        } else if (apron.color === ENUM_APRON_COLOR.BLACK) {


            $('#stencilImg').css('filter', `opacity(0.08) drop-shadow(${apron.stencilColor} 0px 0px 0px)`);
            // $stencilImg.css('background-color', apron.stencilColor);
            $('#stencilImg').css('-webkit-filter', `opacity(0.08) drop-shadow(${apron.stencilColor} 0px 0px 0px)`);

        }


        updateStencilMixBlendMode();
    }

 
   

    

});