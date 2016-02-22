// Connect to food api
// Potential APIS
//     https://developer.edamam.com/
//     http://www.recipepuppy.com/about/api/


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
                console.log('success');
                console.log(response);
            },
            error: function (error) {
                console.log('error');
                console.log(error);
            }
        });

    });
});
