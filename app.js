'use strict';

const Homey = require( 'homey' );
const Generator = require('./lib/generator.js');
const Helper = require('./lib/helper.js');

const { ManagerSettings } = Homey;

const LAST_SETTING_KEY = 'last_animation_frames';

class LedItBe extends Homey.App {
	onInit() {
		var self = this;

		// Restore last used screensaver animation config.
		let lastAnimationFrames = ManagerSettings.get(LAST_SETTING_KEY);
		if (lastAnimationFrames == null) {
			lastAnimationFrames = Generator.createSolidAnimation( { r: 0, g: 100, b: 0 } );
		}
		self.registerAnimation(lastAnimationFrames);

		// Register actions.
		let solidAction = new Homey.FlowCardAction('solid');
		solidAction
			.register()
			.registerRunListener((args, state) => {
				let rgb = Helper.hexToRgb(args.color);
				return self.registerAnimation(Generator.createSolidAnimation(rgb));
			})
		;

		let flashAction = new Homey.FlowCardAction('flash');
		flashAction
			.register()
			.registerRunListener((args, state) => {
				let rgb_1 = Helper.hexToRgb(args.color_1);
				let rgb_2 = Helper.hexToRgb(args.color_2);
				return self.registerAnimation(Generator.createFlashAnimation(rgb_1, rgb_2));
			})
		;

		let stroboscopeAction = new Homey.FlowCardAction('stroboscope');
		stroboscopeAction
			.register()
			.registerRunListener((args, state) => {
				let rgb_1 = Helper.hexToRgb(args.color_1);
				let rgb_2 = Helper.hexToRgb(args.color_2);
				return self.registerAnimation(Generator.createStroboscopeAnimation(rgb_1, rgb_2));
			})
		;

		let lighthouseAction = new Homey.FlowCardAction('lighthouse');
		lighthouseAction
			.register()
			.registerRunListener((args, state) => {
				let rgb_1 = Helper.hexToRgb(args.color_1);
				let rgb_2 = Helper.hexToRgb(args.color_2);
				return self.registerAnimation(Generator.createLighthouseAnimation(rgb_1, rgb_2));
			})
		;

		let searchlightAction = new Homey.FlowCardAction('searchlight');
		searchlightAction
			.register()
			.registerRunListener((args, state) => {
				let rgb_1 = Helper.hexToRgb(args.color_1);
				let rgb_2 = Helper.hexToRgb(args.color_2);
				return self.registerAnimation(Generator.createSearchlightAnimation(rgb_1, rgb_2));
			})
		;

		let butterflyAction = new Homey.FlowCardAction('butterfly');
		butterflyAction
			.register()
			.registerRunListener((args, state) => {
				let rgb_1 = Helper.hexToRgb(args.color_1);
				let rgb_2 = Helper.hexToRgb(args.color_2);
				return self.registerAnimation(Generator.createButterflyAnimation(rgb_1, rgb_2));
			})
		;

		self.log('Application is running.');
	}

	registerAnimation(frames) {
		var self = this;

		ManagerSettings.set(LAST_SETTING_KEY, frames);

		let result = new Promise((resolve) => setTimeout(resolve, 1000));
		if (self.animation != undefined) {
			result = result
				.then(() => {
					self.log("Updating frames ...");
					return self.animation.updateFrames(frames);
				})
				.then(() => {
					self.log("Done.");
				});
		} else {
			self.animation = new Homey.LedringAnimation(self.getAnimationConf(frames));
			result = result
				.then(() => {
					self.log("Registering animation ...");
					return self.animation.register();
				})
				.then(() => {
					self.log("Done.");
					self.log("Registering screensaver ...");
					return self.animation.registerScreensaver( 'leditbe' );
				})
				.then(() => {
					self.log("Done.");
				});
		}

		return result
			.catch(error => {
				self.log('Failure.');
				self.log(error);
			});
	}

	getAnimationConf(frames) {
		return {
			options: {
				fps: 12,
				tfps: 24,
				rpm: 0
			},
			frames: frames,
			duration: false,
			transition: 300,
			priority: 'INFORMATIVE'
		}
	}
}

module.exports = LedItBe;