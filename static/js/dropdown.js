function dropdownOn(){
    $('.wrapper-dropdown').on('click',function(e){
        $('.number-li').show();
        e.stopPropagation();
    });
}
function dropdownOff(){
    $('html').on('click', function(){
        $('.number-li').hide();
    });
}

function compress(){
    var form = $('#ingredientsForm');
    var formCount = form.children().length;
    var items = form.serialize().split('&').map(function(item){
        let i = item.indexOf('=');
        return item.slice(i+1);
    });
    let compressValue = '';
    for (var i=0;i<items.length-1;i++){
        compressValue += items[i]+', ';
    }
    compressValue += items.slice(-1)[0];
    form.empty(); 
    var formEntry = $('<input type=\'text\' name=\'ingredient_0\' class=\'new-ingredient\' value=\''+compressValue+'\'>');
    form.append(formEntry);
    // compress should only be called if not clicking on dropdown or span
    // store contents of all inputs in array if non-empty
    // empty all but one input
    // store contents of array in first input
}

function expand(){
    
}

function dropdownLi(){
    $('.number-li').on('click',function(e){
        $('.number-li').hide();
        // Lengths here should be determined by span or integrate with
        // expand/compress
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
