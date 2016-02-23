// Connect to food api
// Potential APIS
//	 https://developer.edamam.com/
//	 http://www.recipepuppy.com/about/api/


// Test Case:
// User only has potatoes
// Provides Recipe for mashed potatoes

// query = 'http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3';

$(function () {
    $('#getRecipes').click(function () {
        $.ajax({
            url: '/getRecipes',
            type: 'POST',
            data: {food:'tomatoes'},
            success: function (response) {
              $('#recDivHolder').empty();
                var r = JSON.parse(response);
                console.log(r['recipes'][0]);
                for (var i = 0; i < r['count']; i++) {
                    var recDiv = document.createElement("div")
                    recDiv.style.width = '100px';
                    recDiv.style.height = '100px';
                    recDiv.style.backgroundImage = "url("+r['recipes'][i]['image_url']+")";
                    $('#recDivHolder').append(recDiv);
                    console.log(r['recipes'][i]['image_url']);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });

	});
});
