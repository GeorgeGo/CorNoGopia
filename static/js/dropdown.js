function dropdownOn(){
    $('.wrapper-dropdown').on( 'click',function(e){
        console.log('on');
        $('.number-li').show();
        e.stopPropagation();
    });
}
function dropdownOff(){
    $('html').on('click', function(){
        console.log('off');
        $('.number-li').hide();
    });
}
function dropdownLi(){
    $('.number-li').on( 'click',function(e){
        console.log('on');
        $('.number-li').hide();
        e.stopPropagation();
    });
}
dropdownOn();
dropdownOff();
dropdownLi();
