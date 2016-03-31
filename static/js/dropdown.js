$('.wrapper-dropdown').on('click',function(e){
    $('.number-li').show();
});

$('html').on('click', function(e){
    if(e.target.className == 'new-ingredient'){
    }else if(e.target.className == 'wrapper-dropdown' || e.target.className == 'dropdown-label'){
    }else{
        compress();
        $('.number-li').hide();
    }
});

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
}

function expand(){
    // clicking back on the span should expand the contents into how ever many
    // items there are    
}

function dropdownLi(){
    $('.number-li').on('click',function(e){
        $('.number-li').hide();
        // Lengths here should be determined by span or integrate with
        // expand/compress
        // potentially just add how ever many the user wants - 1
        // unsure about how to proceed with expand
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

dropdownLi();
