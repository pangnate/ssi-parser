var fs = require('fs');
var path = require('path');
var util = require('./util');

/*var parser = (function () {

	// vars cache object
	var vars = {};

	// save vars
	var saveVars = function (source) {
		var output;

		output = source.replace(/<!--#set var="(.*?)" value="(.*?)"\s?-->/g, function (match, key, value) {
			// save vars not in the main list
			vars[key] = value;

			// return an empty string to remove the match
			return '';
		});

		return output;
	};

	// parse source
	var parse = function(source){
		var output;

		// parse include


		// save vars
		output = saveVars(source);

		// parse echo
		output = output.replace(/<!--#echo var="(.*?)"\s?-->/g, function (match, key) {
			return vars[key] || '';
		});
		debug(vars);
		return output;
	};

	// exports method
	return {
		parse: parse
	};

})();*/

var debug = function(obj){
	console.log('-------------debug------------');
	console.log(obj);
	console.log('-------------debug------------');
};

function ssiParser(filename, source) {
	var // PRIVATE VARS
		fs = require('fs'),
		path = require('path'),
		filePath = path.dirname(filename) + '/',
		parsed = source,

	// PRIVATE FUNCTIONS
		saveVars = function (data) {
			var output;

			output = data.replace(/<!--#set var="(.*?)" value="(.*?)" -->/g, function (match, key, value) {
				// save vars not in the main list
				if (!vars[key]) {
					vars[key] = value;
				}

				// return an empty string to remove the match
				return '';
			});

			return output;
		},
		parseIf = function (data) {

		};

	/**
	 * read file
	 **/
	// passed in as source

	/**
	 * parse SSIs
	 **/
	/** vars - save from parent file **/
	parsed = saveVars(parsed);

	/** #include **/
	parsed = parsed.replace(/<!--#include virtual="(.*?)" -->/g, function (match, includePath) {
		var output;

		// save out read file
		output = ssiParser(filePath + includePath, fs.readFileSync(filePath + includePath, 'utf8'));

		// save out the vars
		output = saveVars(output);

		// return the processed include
		return output;
	});

	/** vars - echo **/
	parsed = parsed.replace(/<!--#echo var="(.*?)" -->/g, function (match, key) {
		return vars[key];
	});

	/**
	 * return expanded data
	 */
	return parsed;
}

function parser(){}

// export node.js module
module.exports = new parser();