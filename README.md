### Running Application
Click on following link:
[http://scottyoon221.github.io/optimization/](http://scottyoon221.github.io/optimization/)

To go to minified pizza page, click on Cam's Pizzeria link from the main page.


### Optimization: pizza.html 
1. pizzeria.jpg file size reduction - The image should look good on Desktop or mobile, but anything beyond that is excessive. Since maximum is can stretch is 720 x 540 resolution, I've used GIMP graphic editing tool to resized it down to match the require resolution and remove metadata to further optimize it.

1. uncss bootstrap-grid.css and style.css file: Since there are number of unused CSS rules, the unused part was removed by using grunt uncss.

1. embed bootstrap, and embeded style.css: To reduce the number of client-server roundtrips, stylesheet was embeded. 

1. async embed javascript: while DOM is being constructed we can embed and asynchronously call part of main.js file to build anything below-the-fold content (pizzas menu) and load pizza on the background.

1. folowing files was minified to reduce the file size:
* pizza.html
* main.js
* embeded bootstrap, embeded style.css, embeded part of main.js


### Optimization: main.js
1. changePizzaSizes:  offsetWidth is always the same through out the entire array of pizzas and the same goes for the result of determineDx function. Thus, we can extract these two and calculate outside of the loop.

```bash
function changePizzaSizes(size) {
    
	// we don't need these variables to be constantly be called inside the loop. Also the value of the variable newWidth should be the
	// same through out loop. 
	var pizzas = document.querySelectorAll(".randomPizzaContainer"),
	    i = pizzas.length,
	    newWidth = pizzas[0].offsetWidth + determineDx(pizzas[0], size) + 'px';

	while(i--){
	  document.querySelectorAll(".randomPizzaContainer")[i].style.width = newWidth;
	}
}
```

1. updatePositions: Since the remainder of 5 can only be 0,1,2,3, or 4 and variable i is decrementing in order, we can expect the result will be within the range of 5 different calculation. All we have to do in the loop is to pick the right result from the calculation and add it with items[i].basicLeft

```bash
// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");
  // Remove anything we can calculate outside of for loop to save some computation time
  var items = document.querySelectorAll('.mover'),
      scrollLoc = document.body.scrollTop / 1250,
      phase1 = 100 * Math.sin(scrollLoc),
      phase2 = 100 * Math.sin(scrollLoc + 1),
      phase3 = 100 * Math.sin(scrollLoc + 2),
      phase4 = 100 * Math.sin(scrollLoc + 3),
      phase5 = 100 * Math.sin(scrollLoc + 4),
      phases = [phase1, phase2, phase3, phase4, phase5],
      i = items.length;

  //loop will go on until it reaches to 0. By using while loop, we are avoiding the value comparison for each loop
  while (i--) {
    //  var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
    // items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
    // console.log("original eq: "+items[i].style.left);
    items[i].style.left = items[i].basicLeft + phases[i%5] + 'px';
    // console.log("modified eq: "+items[i].style.left);
}
```

1. number of loop inside DOMContentLoaded addEventListener: Since it only displays at most 8 pizzas per column and there are 4 rows of pizzas in the screen any more than total of 32 pizzas is excessive.

```bash
document.addEventListener('DOMContentLoaded', function() {
	...

	for (var i = 0; i < 32; i++) {
		...
	}
}
```




