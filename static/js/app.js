
// Connect to food api
// Potential APIS
//	 https://developer.edamam.com/
// http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
// http://food2fork.com/api/search?key=373a612eeeae2813e001680f04b585db&q=beans,rice

// Recipe Object Array
function Recipe(recipeObject){
	this.publisher = recipeObject['publisher'];
	this.title = recipeObject['title'];
	this.social_rank = recipeObject['social_rank'];
	this.f2f_url = recipeObject['f2f_url'];
	this.publisher_url = recipeObject['publisher_url'];
	this.source_url = recipeObject['source_url'];
	this.image_url = recipeObject['image_url'];
	this.recipe_id = recipeObject['recipe_id'];
	this.ingredients = [];
}

recipes = []

function getRecipes() {
	$.post({
		url: '/getRecipes',
		data: $('#ingredientsForm').serialize(),
		success: function(response) {
			$('#recipeDivHolder').empty();
			recipes = [];
			var r = JSON.parse(response);
			for (var i = 0; i < r['count']; i++) {
				recipes.push(new Recipe(r['recipes'][i]));

				var recipeDiv = $('<div></div>');
				recipeDiv.addClass('recipeDiv');
				recipeDiv.css('background-image', "url(" + recipes[i].image_url + ")");
				recipeDiv.css('backgroundRepeat', "no-repeat");
				var recipeNameDiv = $('<div></div>');
				recipeNameDiv.addClass('recipeNameDiv');
				recipeNameDiv.text(recipes[i].title);
				recipeDiv.append(recipeNameDiv);
				recipeDiv.click(function (event){
					if (this.className === 'recipeDiv') {
						$(this).css('background-image', 'none');
						$(this).addClass('recipe-card');
						$(this).removeClass('recipeDiv');
						$(this).children().addClass('recipe-name-card');
						$(this).children().removeClass('recipeNameDiv');

					}else if (this.className === 'recipe-card') {
						$(this).css('background-image', "url(" + recipes[i].image_url + ")");
						$(this).addClass('recipeDiv');
						$(this).removeClass('recipe-card');
						$(this).children().addClass('recipeNameDiv');
						$(this).children().removeClass('recipe-name-card');
					}
				})
				// recipe-card.click(function (event){
				// 	recipe-card.addClass('recipeDiv');
				// 	recipe-card.removeClass('recipeDiv');
				// })
				$('#recipeDivHolder').append(recipeDiv);
			}
		},
		error: function(error) {
			console.log('There was an error with recipe retrieval');
		}
	});
}

$('#getRecipes span').click(function () {
	$('#ingredientsForm').submit();
});

// // Call this post request on click of a recipeDiv
// $.post({
// 	url: '/getIngredients',
// 	data: recipes[i].recipe_id,
// 	success: function (response) {
// 		var r = JSON.parse(response);
// 		recipes[i].ingredients = r['ingredients'];
// 	},
// 	error: function (error) {
// 		console.log('There was an error with ingredients retrieval');
// 	}
// })

$('#ingredientsNumber').change(function (event) {
	var previousLength = $('#ingredientsForm').children().length;
	var newLength = $('#ingredientsNumber').val();
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
