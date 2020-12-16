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
	publicAPIs.doSomething = function () {
		somePrivateMethod();
		// Code goes here...
	};

	publicAPIs.render = function () {
		let arr = document.querySelector('.vico').children
		console.log(arr);
	};
	

	//
	// Return the Public APIs
	//

	return publicAPIs;

})();


console.log(vico);