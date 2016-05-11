// function cardToggle(){
// 	$('.recipeDiv').click(function (event){
// 		$('.recipeDiv').setAttribute('class', 'recipeCar')
// 	})
// }
console.log($('.recipe-card').length);

function cardToggleOff() {
	console.log('started');
	if ($('.recipe-card').length > 0) {
		console.log('ok it should flip now');
		Recipe.flipper();
	};
};
	cardToggleOff();
