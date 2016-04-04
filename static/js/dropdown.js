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

function updateDropdownLabel(value) {
    $('.wrapper-dropdown .dropdown-label').text(value);
}

function compress(){
    var form = $('#ingredientsForm');
    var formCount = form.serializeArray().length;
    var items = [];
    form.serializeArray().forEach(function(obj) {
        if (obj.value.match(/^[a-z][a-z\ ,]*$/i)) {
           items.push(obj.value.trim());
        }
    });
    let compressValue = '';
    if (items.length > 0) {
        for (var i=0;i<items.length-1;i++){
            compressValue += items[i]+', ';
        }
        compressValue += items.slice(-1)[0];
        let numberOfIngredients = 0;
        items.forEach(function(str){
            let count = str.split(',').length;
            numberOfIngredients += count;
        });
        updateDropdownLabel(numberOfIngredients);
    } else {
        updateDropdownLabel(items.length+1);
    }
    compressValue = compressValue.trim();
    form.empty(); 
    var formEntry = $('<input type=\'text\' id=\'ingredient_0\' name=\'ingredient_0\' class=\'new-ingredient\' value=\''+compressValue+'\'>');
    form.append(formEntry);
}

function expand(){
    let firstField = $('#ingredient_0');
    if (firstField.val()) {
        if(firstField.val().indexOf(',')!=-1){
            let arr = firstField.val().split(',');
            $('#ingredientsForm').empty();
            for(var i=0;i<arr.length;i++){
                var formEntry = $("<input type=\"text\" id=\"ingredient_"+(i-1)+"\" name=\"ingredient_"+i+"\" class=\"new-ingredient\" value=\""+arr[i].replace(/^ /g,'')+"\">");
                $('#ingredientsForm').append(formEntry); 
            }
            updateDropdownLabel(i);
        }    
    }
}

function dropdownLi(){
    $('.number-li').on('click',function(e){
        $('.number-li').hide();
        expand();
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
    		for (var i = newLength; i < previousLength; i++) {
    			$('#ingredientsForm input:last-child').remove()
    		}
    	}
        e.stopPropagation();
    });
}

dropdownLi();
