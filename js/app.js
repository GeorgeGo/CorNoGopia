// Connect to food api
// Potential APIS
//     https://developer.edamam.com/
//     http://www.recipepuppy.com/about/api/


// Test Case:
// User only has potatoes
// Provides Recipe for mashed potatoes

// food2fork
const API_KEY = '5dbe8dc691de2b3d8db331019416a9e5';

var website = 'http://food2fork.com/api/';
// 'search' or 'get'
var key = '?key='+API_KEY+'&q=';
var search = 'potatoes';
var query = website+'search'+key+search;

$.getJSON(query,function(data) {
    console.log(data);
});


// Send an XML request locally to a script in either rails or python (idk which)
// Script processes request and calls relevant api for information

// Test getJSON from webpage for x request
