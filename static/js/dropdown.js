function dropdownOn(){
    $('.wrapper-dropdown').on('click',function(e){
        $('.number-li').show();
        e.stopPropagation();
    });
}
function dropdownOff(){
    $('html').on('click', function(){
        $('.number-li').hide();
        // compress();
    });
}
function dropdownLi(){
    $('.number-li').on('click',function(e){
        $('.number-li').hide();

        var previousLength = + $('.wrapper-dropdown .dropdown-label').text();
    	var newLength = + this.id[this.id.length-1];
        $('.wrapper-dropdown .dropdown-label').text(newLength);
    	if (newLength >= previousLength) {
    		var difference = newLength - previousLength;
    		for (var i = 0; i < difference; i++) {
    			var formEntry = $("<input type=\"text\" name=\"ingredient_"+i+"\" class=\"new-ingredient\">");
    			$('#ingredientsForm').append(formEntry);
    		}
    	} else {
    		var difference = previousLength - newLength;
    		for (var i = 0; i < difference; i++) {
    			$('#ingredientsForm input:last-child').remove()
    		}
    	}
        e.stopPropagation();
    });
}

dropdownOn();
dropdownOff();
dropdownLi();
