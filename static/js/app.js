// Potential APIS
// 	https://developer.edamam.com/
// 	http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
recipes = []

// Recipe Object
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
	this.state = 0; // 0 is picture; 1 is card
	this.get_div = function () {
		var self = this;
		var div = $('<div></div>');
		div.addClass('recipeDiv');
		div.css('background-image', "url(" + this.image_url + ")");
		div.css('backgroundRepeat', "no-repeat");
		var recipeNameDiv = $('<div></div>');
		recipeNameDiv.addClass('recipeNameDiv');
		recipeNameDiv.text(this.title);
		div.append(recipeNameDiv);
		div.click(function (event){
			var that = this;
			if (self.ingredients == 0) {
				$.post({
					url: '/getIngredients',
					data: {'rId': self.recipe_id},
					beforeSend: function () {
						console.log("before");
					},
					complete: function () {
						console.log('completes');
					},
					success: function (response) {
						console.log('hello');
						var r = JSON.parse(response);
						self.ingredients = r['recipe']['ingredients'];
						console.log(that.className);
						if (that.className === 'recipeDiv') {
							$(that).empty();
							var recipe_card_ingredients_list = $('<ul></ul>');
							for (var i = 0; i < self.ingredients.length; i++) {
								recipe_card_ingredients_list.append('<li>'+self.ingredients[i]+'</li>');
								console.log(self.ingredients[i]);
								console.log('hi');
							}
							$(that).css('background-image', 'none');
							$(that).addClass('recipe-card');
							$(that).removeClass('recipeDiv');
							recipe_card_ingredients_list.addClass('ingredient-card-list');
							$(that).append(recipe_card_ingredients_list);


						}else if (that.className === 'recipe-card') {
							$(that).empty();
							// var recipeNameDiv = $('<div></div>');
							// recipeNameDiv.addClass('recipeNameDiv');
							// recipeNameDiv.text(self.title);
							// $(that).append(recipeNameDiv);
							// $(that).children().text('');
							$(that).css('backgroundRepeat', "no-repeat");
							var recipeNameDiv = $('<div></div>');
							recipeNameDiv.addClass('recipeNameDiv');
							// recipeNameDiv.text(that.title);
							$(that).append(recipeNameDiv);

							$(':nth-child(2)', that).text(self.title);
							$(that).css('background-image', "url(" + self.image_url + ")");
							$(that).addClass('recipeDiv');
							$(that).removeClass('recipe-card');
						}
					},
					error: function (error) {
						alert('There was an error with ingredients retrieval\nCode: '+error);
					}
				});
			}else{
				if (this.className === 'recipeDiv') {
					$(this).empty();
					var recipe_card_ingredients_list = $('<ul></ul>');
					for (var i = 0; i < self.ingredients.length; i++) {
						recipe_card_ingredients_list.append('<li>'+self.ingredients[i]+'</li>');
						console.log(self.ingredients[i]);
						console.log('hi');
					}
					$(this).css('background-image', 'none');
					$(this).addClass('recipe-card');
					$(this).removeClass('recipeDiv');
					recipe_card_ingredients_list.addClass('ingredient-card-list');
					$(this).append(recipe_card_ingredients_list);


				}else if (this.className === 'recipe-card') {
					$(this).empty();
					var recipeNameDiv = $('<div></div>');
					recipeNameDiv.addClass('recipeNameDiv');
					recipeNameDiv.text(self.title);
					$(this).append(recipeNameDiv);
					$(this).css('backgroundRepeat', "no-repeat");
					var recipeNameDiv = $('<div></div>');
					recipeNameDiv.addClass('recipeNameDiv');
					// recipeNameDiv.text(this.title);
					$(this).css('background-image', "url(" + self.image_url + ")");
					$(this).addClass('recipeDiv');
					$(this).removeClass('recipe-card');
				}
			}
		});
		return div;
	}
}

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
				$('#recipeDivHolder').append(recipes[i].get_div());
			}
		},
		error: function(error) {
			alert('There was an error with recipe retrieval\nCode: '+error);
		}
	});
}

$('#getRecipes span').click(function () {
	$('#ingredientsForm').submit();
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
