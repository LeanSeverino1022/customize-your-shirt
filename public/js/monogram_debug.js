$(document).ready(function () {
    

    //for debugging purpose only
    window.textBlendMode = $(".badge-text2").css('mix-blend-mode');
    window.stencilBlendMode = $("#stencil").css('mix-blend-mode')

    $('input[name="mix_blend_mode"][value="' + textBlendMode + '"]').prop('checked', true)
    $('input[name="stencil_mix_blend_mode"][value="' + stencilBlendMode + '"]').prop('checked', true)

    $('#opacity-slider').val($('.badge-text2').css('opacity'));
    


    $('#slider-value').html($('#opacity-slider').val());
});
    


/* for debugging text opacity purposes */
$('#opacity-slider').on("change mousemove", function() {
    $('#slider-value').html($(this).val());
    $('.badge-text2').css({
      'opacity': $(this).val()
    });
  });


  $('input[name="mix_blend_mode"]').on('change', function(){
      $(".badge-text2").css('mix-blend-mode', $('input[name="mix_blend_mode"]:checked').val());

      $('#opacity-slider').val($('.badge-text2').css('opacity'));
      $('#slider-value').html($('#opacity-slider').val());
    
      
    
  });

//   STENCIL

// $('#opacity-slider-stencil').on("change mousemove", function() {
//     $('#stencil-slider-value').html($(this).val());
//     $('.badge-text2').css({
//       'opacity': $(this).val()
//     });
//   });


  $('input[name="stencil_mix_blend_mode"]').on('change', function(){
      $("#stencil").css('mix-blend-mode', $('input[name="stencil_mix_blend_mode"]:checked').val());

      $('#opacity-slider').val($('.badge-text2').css('opacity'));
      $('#slider-value').html($('#opacity-slider').val());
    
      
    
  });

  function switchBlendMode( selectedOption ){
    return;
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
    return;
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


 
