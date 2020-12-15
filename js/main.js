/*!
 * Verticon - Vertical Content Slider
 * (c) 2017 Dennis Dobirr, Marius Kosik, MIT License, https://breakpoint-media.io
 */

const vico = (function () {

	'use strict';

	//
	// Variables
	//

	var publicAPIs = {};


	//
	// Methods
	//

	/**
	 * A private method
	 */
	var somePrivateMethod = function () {
		// Code goes here...
	};

	/**
	 * A public method
	 */
	publicAPIs.doSomething = function () {
		somePrivateMethod();
		// Code goes here...
	};
	

	//
	// Return the Public APIs
	//

	return publicAPIs;

})();


console.log(vico);