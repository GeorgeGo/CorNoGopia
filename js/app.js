// Connect to food api
// Potential APIS
//     https://developer.edamam.com/
//     http://www.recipepuppy.com/about/api/


// Test Case:
// User only has potatoes
// Provides Recipe for mashed potatoes
var baseURL = "http://www.recipepuppy.com/api/?";
var ingredients = "potato";
var dish = "salad";
var query = baseURL + "i=" + ingredients + "&q=" + dish;



var req = new XMLHttpRequest();
req.open('GET', query, false);
req.send(null);
if(req.status == 200) {
   dump(req.responseText);
}

console.log(req.responseText);
