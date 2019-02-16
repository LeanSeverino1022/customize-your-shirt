
// todo puyih: \
//set defaults in initializeDefaults function

$(document).ready(function () {

    let product = {
        color: $('.prod-option.active').data().color, //selected by user
        stencilColor: $('.color-option.active', '#stencil-color-picker').data().color, //selected by user
        textColor: $('.color-option.active', '#font-color-picker').data().color, //selected by user
        textFont: "Extra_Grotesque", //selected by user
        textFontSize: null, //dependent on the textFont

        updateText: function () { $('textPath').text($("#MonoText").val().toUpperCase()) },

        setupEventListeners: function () {
            $('#MonoText').on('keyup', product.updateText);
            $('.product_thumbs').on("click", ".prod-option", updateProdColor);
            $("#stencilDrop").on("change", updateStencilFigure); //jquery ui selectmenu event
            $('#stencil-color-picker').on('click', '.color-option', updateStencilColor);

            $("#fontFamilyDrop").on("change", updateFontFamily); //jquery ui selectmenu event
            $('#font-color-picker').on('click', '.color-option', updateFontColor);
        },

    }

    initializeDefaults();
    product.setupEventListeners();


    function initializeDefaults() {        
        $("#MonoText").val("CARPE DIEM");
    }

    function updateProdColor(e) {

        if ($(e.target).hasClass('active')) {
            return;
        }

        //render
        $(".prod-option.active").removeClass('active');
        $(e.target).addClass('active');

        //update value
        product.color = $('.prod-option.active').data().color;

        //update rendered apron color
        $(".apron-background img").attr("src", $(e.target).attr("src"));
    }

    function updateStencilFigure() {

        var val = $("#stencilDrop").val();

        switch (parseInt(val)) {
            case 0:
                $('.stencilImg').toggleClass("hidden", true);
                $('.stencilImg').eq(0).toggleClass("hidden",false);                    
  
                break;
            case 1:
                $('.stencilImg').toggleClass("hidden", true);
                $('.stencilImg').eq(1).toggleClass("hidden",false);      
                break;
            case 2:
                $('.stencilImg').toggleClass("hidden", true);
                $('.stencilImg').eq(2).toggleClass("hidden",false);      
                break;
            case 3:
                $('.stencilImg').toggleClass("hidden", true);
                $('.stencilImg').eq(3).toggleClass("hidden",false);      
                break;
            case 4:
                $('.stencilImg').toggleClass("hidden", true);
                $('.stencilImg').eq(4).toggleClass("hidden",false);    
                break;
        
            default:
                break;
        }          

    }

    function updateFontFamily() {

        let val = $("#fontFamilyDrop").val();

        var fontWeight = 'normal';

        switch (val) {
            case "font1":
                product.textFont = "CC_wild_words_roman";
                product.textFontSize = '22px';
                break;

            case "font2":
                product.textFont = "Blambot";
                product.textFontSize = '16px';
                break;

            case "font3":
                product.textFont = "Coopbl";
                product.textFontSize = '19px';
                break;

            case "font4":
                product.textFont = "Extra_Grotesque";
                product.textFontSize = '15px';
                break;

            case "font5":
                product.textFont = "Vladimir";
                product.textFontSize = '19px';
                fontWeight = 'bold';
                break;

            default:
                break;
        }

        $('.badge-text2 text').css(
            {
                'font-family': product.textFont,
                'font-size': product.textFontSize,
                // 'letter-spacing': letterSpacing,
                'font-weight': fontWeight
            });

    }



    function updateFontColor(e) {


        if ($(e.target).hasClass('active')) return;

        $("#font-color-picker > .color-option.active").removeClass('active');
        $(e.target).addClass('active');

        product.textColor = $(e.target).data().color;

        $('.badge-text2 text').css({
            'fill': product.textColor,
            'text-shadow': "0 0 2px " + product.textColor,
        });

    }

    function updateStencilColor(e) {
        //if option is already current
        if ($(e.target).hasClass('active')) return;

        $("#stencil-color-picker > .stencil.color-option.active").removeClass('active');
        $(e.target).addClass('active');

        product.stencilColor = $(e.target).data().color;

        $('.stencilImg').css('fill',$(e.target).data().color);
    }    

});