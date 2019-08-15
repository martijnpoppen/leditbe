'use strict';

const Homey = require( 'homey' );

class Helper {

	static GGD(a, b) {
		if (b == 0) {
			return a;
		} else {
			return Helper.GGD(b, a % b);
		}
	}

	static hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

}

module.exports = Helper;