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
				var recipeDiv = document.createElement("div");
				recipeDiv.style.width = '100%';
				recipeDiv.style.height = '100px';
				recipeDiv.style.backgroundImage = "url(" + r['recipes'][i]['image_url'] + ")";
				var recipeNameDiv = document.createElement("div");
				recipeNameDiv.innerHTML = r['recipes'][i]['title'];
				recipeDiv.appendChild(recipeNameDiv);
				$('#recipeDivHolder').append(recipeDiv);
			}
		},
		error: function(error) {
			alert('There was an error');
		}
	});
}

$('#getRecipes').click(function () {
	$('#ingredientsForm').submit();
});

$('#ingredientsNumber').submit(function (event) {
	$('#ingredientsForm').empty();
	var a = $('#ingredientsNumber').serializeArray()[0].value;
	for (var i = 0; i < a; i++) {
		var formEntry = document.createElement("input");
		formEntry.type = "text";
		formEntry.name = "ingredient_"+i;
		$('#ingredientsForm').append("Ingredient "+(i+1),"<br>",formEntry,"<br>");
	}
	event.preventDefault();
});

$('#ingredientsForm').submit(function(event) {
	getRecipes();
 	event.preventDefault();
});
