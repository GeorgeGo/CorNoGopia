
// Connect to food api
// Potential APIS
//	 https://developer.edamam.com/


// Test Case:
// User only has potatoes
// Provides Recipe for mashed potatoes
// query = 'http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3';

function getRecipes() {
	$.post({
		url: '/getRecipes',
		data: $('#ingredientsForm').serialize(),
		success: function(response) {
			$('#recipeDivHolder').empty();
			var r = JSON.parse(response);
			for (var i = 0; i < r['count']; i++) {
				var recipeDiv = $('<div></div>');
				recipeDiv.addClass('recipeDiv');
				recipeDiv.css('background-image', "url(" + r['recipes'][i]['image_url'] + ")");
				recipeDiv.css('backgroundRepeat', "no-repeat");
				var recipeNameDiv = $('<div></div>');
				recipeNameDiv.addClass('recipeNameDiv');
				recipeNameDiv.text(r['recipes'][i]['title']);
				recipeDiv.append(recipeNameDiv);
				recipeDiv.click(function (event){
					if (this.class) {

					}
					recipeDiv.addClass('recipe-card');
					recipeDiv.removeClass('recipeDiv');
				})
				recipe-card.click(function (event){
					recipe-card.addClass('recipeDiv');
					recipe-card.removeClass('recipeDiv');
				})
				$('#recipeDivHolder').append(recipeDiv);
			}
		},
		error: function(error) {
			console.log('There was an error with recipe retrieval');
		}
	});
}

$('#getRecipes').click(function () {
	$('#ingredientsForm').submit();
});

// $.post({
// 	url: '/getIngredients',
// 	data: r['recipes'][i]['recipe_id'],
// 	success: function (response) {
// 		// console.log(response);
// 	},
// 	error: function (error) {
// 		console.log('There was an error with ingredients retrieval');
// 	}
// })

$('#ingredientsNumber').change(function (event) {
	$('#ingredientsForm').empty();
	var a = $('#ingredientsNumber').val();
	for (var i = 0; i < a; i++) {
		var formEntry = $("<input type=\"text\" name=\"ingredient_"+i+"\" class=\"new-ingredient\">");
		$('#ingredientsForm').append(formEntry);
	}
	event.preventDefault();
});

$('#ingredientsForm').keypress(function(event) {
    if (event.which == 13) {
        $('#ingredientsForm').submit();
		event.preventDefault();
    }
});

$('#ingredientsForm').submit(function(event) {
	getRecipes();
 	event.preventDefault();
});
