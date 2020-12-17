/*!
 * Vico - Vertical Content Slider
 * (c) 2020 Dennis Dobirr, Marius Kosik, MIT License, https://breakpoint-media.io
 */

const vico = (function () {

	'use strict';

	//
	// Variables
	//

	let publicAPIs = {};

	let getVicoObj = document.querySelector('.vico');

	publicAPIs.vdata = [];

	//
	// Methods
	//

	/**
	 * A private method
	 */
	let somePrivateMethod = function () {
		// Code goes here...
	};


	/**
	 * A public method
	 */
	publicAPIs.render = function () {
		let arr = Array.from(getVicoObj.children);

		/* create image container */
		let imgContainer  = document.createElement("div");
		imgContainer.classList.add('vi_stage');

		/* create contnet container */
		let contentContainer  = document.createElement("div");
		contentContainer.classList.add('vi_content');
		
		
		arr.forEach(function(value, index) {
			
			/* get the path of new image */
			let pathOfImage = value.getElementsByTagName('img')[0].getAttribute('src');

			/* delete img */
			let imgObj = value.getElementsByTagName('img')[0];
			imgObj.parentNode.removeChild(imgObj);

			/* get the rest of the contnet */
			let textObj = value.innerHTML;
			
			/* bring all together and push object to array */
			publicAPIs.vdata.push({
				active: false,
				index: index,
				imagePath: pathOfImage,
				text: textObj
			})

		})

		/* delete all contnet from DOM */
		getVicoObj.innerHTML = "";

		/* inject to dom */
		for(var item in publicAPIs.vdata) {
			
			/* create item container and inject contnet items */
			let contnetItem  = document.createElement("div");
			contnetItem.classList.add('vi_item');
			
			contnetItem.innerHTML += '<div class="vi_item_inner">' + publicAPIs.vdata[item].text + '</div>';
			
			contentContainer.append(contnetItem);


			/* build 2 img tags with start path */
			let imgDiv  = document.createElement("div");
			imgDiv.classList.add('vi_image_item');

			imgDiv.style.backgroundImage = "url(" + publicAPIs.vdata[item].imagePath + ")";


			//let img  = document.createElement("img");
			//img.setAttribute('src', publicAPIs.vdata[item].imagePath);
			//img.setAttribute('alt', 'Vico');




			if(item < 2) {
				//imgDiv.append(img);
				imgContainer.append(imgDiv);
			}





			
			
		}

		getVicoObj.append(imgContainer);
		getVicoObj.append(contentContainer);
		
		
	};
	

	//
	// Return the Public APIs
	//

	return publicAPIs;

})();


vico.render();

console.log(vico);



/* viewport */
// $.fn.isInViewport = function () {
// 	let elementTop = $(this).offset().top;
// 	let elementBottom = elementTop + $(this).outerHeight();

// 	let viewportTop = $(window).scrollTop();
// 	let viewportBottom = viewportTop + $(window).height();

// 	return elementBottom > viewportTop && elementTop < viewportBottom;
// };

// $('main section, .headline_wrapper, .text_bild_inner').each(function(i, el){
// 	if ($(this).isInViewport()) {
// 		$(this).addClass('animate_it');
// 	}
// })
// $(window).scroll(function () {
// 	$('main section, .headline_wrapper, .text_bild_inner').each(function(i, el){
// 		if ($(this).isInViewport()) {
// 			$(this).addClass('animate_it');
// 		}
// 	})
// });