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

$(document).on('click','.new-ingredient',function(){
    expand();
});

function compress(){
    var form = $('#ingredientsForm');
    var formCount = form.serializeArray().length;
    var items = form.serializeArray();
    let compressValue = '';
    for (var i=0;i<items.length-1;i++){
        compressValue += items[i].value+', ';
    }
    compressValue += items.slice(-1)[0].value;
    form.empty(); 
    var formEntry = $('<input type=\'text\' id=\'ingredient_0\' name=\'ingredient_0\' class=\'new-ingredient\' value=\''+compressValue+'\'>');
    form.append(formEntry);
}

function expand(){
    let firstField = $('#ingredient_0');
    if(firstField.val().indexOf(',')!=-1){
        let arr = firstField.val().split(',');
        $('#ingredientsForm').empty();
        for(let i=0;i<arr.length;i++){
            var formEntry = $("<input type=\"text\" id=\"ingredient_"+(i-1)+"\" name=\"ingredient_"+i+"\" class=\"new-ingredient\" value=\""+arr[i].replace(/^ /g,'')+"\">");
            $('#ingredientsForm').append(formEntry); 
        }
    }
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
    		for (var i = previousLength; i < newLength; i++) {
    			var formEntry = $("<input type=\"text\" id=\"ingredient_"+i+"\" name=\"ingredient_"+i+"\" class=\"new-ingredient\">");
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
