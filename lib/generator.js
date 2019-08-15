'use strict';

const Homey = require( 'homey' );

const Helper = require('./helper.js');

class Generator {

	static createSolidAnimation(rgb) {
		let frame = [];
		for (let pixel = 0; pixel < 24; pixel++) {
			frame.push( rgb );
		}
		return [ frame ];
	}

	static createFlashAnimation(rgb_1, rgb_2) {
		let frames = [];
		for (let frameIndex = 0; frameIndex < 24; frameIndex++) {
			let frame = [];
			for (let pixelIndex = 0; pixelIndex < 24; pixelIndex++) {
				if (frameIndex < 4) {
					frame.push( rgb_1 );
				} else {
					frame.push( rgb_2 );
				}
			}
			frames.push(frame);
		}
		return frames;
	}

	static 	createStroboscopeAnimation(rgb_1, rgb_2) {
		let frames = [];
		for (let frameIndex = 0; frameIndex < 24; frameIndex++) {
			let frame = [];
			for (let pixelIndex = 0; pixelIndex < 24; pixelIndex++) {
				if (frameIndex % 6 == 0) {
					frame.push( rgb_1 );
				} else {
					frame.push( rgb_2 );
				}
			}
			frames.push(frame);
		}
		return frames;
	}

	static createLighthouseAnimation(rgb_1, rgb_2) {
		let frames = [];
		for (let frameIndex = 0; frameIndex < 24; frameIndex++) {
			let frame = [];
			for (let pixelIndex = 0; pixelIndex < 24; pixelIndex++) {
				let offset = Math.floor((pixelIndex + frameIndex) / 6) % 4;
				if (offset == 0 || offset == 2) {
					frame.push( rgb_1 );
				} else {
					frame.push( rgb_2 );
				}
			}
			frames.push(frame);
		}
		return frames;
	}

	static createSearchlightAnimation(rgb_1, rgb_2) {
		let frames = [];
		for (let frameIndex = 0; frameIndex > -24; frameIndex--) {
			let frame = [];
			for (let pixelIndex = 0; pixelIndex < 24; pixelIndex++) {
				let offset = Math.floor((pixelIndex + frameIndex) / 3) % 8;
				if (offset == 0) {
					frame.push( rgb_1 );
				} else {
					frame.push( rgb_2 );
				}
			}
			frames.push(frame);
		}
		return frames;
	}
}

module.exports = Generator;