function landing(){
    $('.main-container').hide()

}
function enterMain(){
    $('.enter-button').on('click',function(e){
        $('.landing-container').hide();
        $('.main-container').fadeIn( "slow" );
    })
}
function enterHover(){

	$('.enter-button').on('mouseover',function(e){
    	$('.enter-button').css('background-color', "rgba(236, 142, 88, 0.85");
    })
	$('.enter-button').on('mouseout',function(e){
    	$('.enter-button').css('background-color', "rgba(236, 142, 88, 0.25)");
    })
}






enterHover();
landing();
enterMain();
