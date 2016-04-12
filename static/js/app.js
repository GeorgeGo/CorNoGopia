recipes = []
// Recipe Object
function Recipe(recipeObject) {
	this.publisher = recipeObject['publisher'];
	this.title = s.unescapeHTML(recipeObject['title']);
	this.social_rank = recipeObject['social_rank'];
	this.f2f_url = recipeObject['f2f_url'];
	this.publisher_url = recipeObject['publisher_url'];
	this.source_url = recipeObject['source_url'];
	this.image_url = recipeObject['image_url'];
	this.recipe_id = recipeObject['recipe_id'];
	this.ingredients = [];
	this.state = 0; // 0 is picture; 1 is card
	this.get_div = function() {
		var self = this;
		var div = $('<div></div>');
		div.addClass('recipeDiv');
		div.css('background-image', "url(" + this.image_url + ")");
		div.css('backgroundRepeat', "no-repeat");
		var recipeNameDiv = $('<div></div>');
		recipeNameDiv.addClass('recipeNameDiv');
		recipeNameDiv.text(this.title);
		div.append(recipeNameDiv);
		div.click(function(event) {
			var that = this;
			function flipper() {
				if (that.className === 'recipeDiv') {
					$(that).empty();
					var recipe_card_ingredients_list = $('<ul></ul>');
					for (var i = 0; i < self.ingredients.length; i++) {
						recipe_card_ingredients_list.append('<li>' + self.ingredients[i] + '</li>');
					}
					$(that).css('background-image', 'none');
					$(that).addClass('recipe-card');
					$(that).removeClass('recipeDiv');
					recipe_card_ingredients_list.addClass('ingredient-card-list');
					$(that).append(recipe_card_ingredients_list);
				} else if (that.className === 'recipe-card') {
					$(that).empty();
					$(that).css('backgroundRepeat', "no-repeat");
					var recipeNameDiv = $('<div>'+self.title+'</div>');
					recipeNameDiv.addClass('recipeNameDiv');
					$(that).append(recipeNameDiv);
					$(that).css('background-image', "url(" + self.image_url + ")");
					$(that).addClass('recipeDiv');
					$(that).removeClass('recipe-card');
				}
			}
			if (self.ingredients == 0) {
				$.post({
					url: '/getIngredients',
					data: {
						'rId': self.recipe_id
					},
					beforeSend: function() {
						let img = $('<img src="static/images/ajax-loader.gif"/>');
						img.css({'position': 'absolute',
							'margin-left': '50%',
							'left': '-50px',
							'margin-top': '150px',
							'width': '100px',
							'height': '100px'});
						$(that).append(img);
					},
					complete: function() {
						$(that).children('img').remove();
					},
					success: function(response) {
						var r = JSON.parse(response);
						self.ingredients = r['recipe']['ingredients'];
						flipper();
					},
					error: function(error) {
						alert(`There was an error with ingredients retrieval\nStatus: ${error.status}\nResponse: ${error.responseText}`);
					}
				});
			} else {
				flipper();
			}
		});
		return div;
	}
}

function getRecipes() {
	$.post({
		url: '/getRecipes',
		data: $('#ingredientsForm').serialize(),
		complete: function() {
			$("body, html").animate({
				scrollTop: $('#recipeDivHolder').offset().top
			}, 600);
		},
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
			alert(`There was an error with recipe retrieval\nStatus: ${error.status}\nResponse: ${error.responseText}`);
		}
	});
}

$('#getRecipes').click(function() {
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
