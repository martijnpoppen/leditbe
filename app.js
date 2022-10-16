const Homey = require('homey');
const { createSolidAnimation } = require('./lib/generators');
const { getAnimationConf } = require('./lib/helpers');
const actions = require('./lib/flow/actions');

const LAST_SETTING_KEY = 'last_animation_frames';

class LedItBe extends Homey.App {
    log() {
        console.log.bind(this, '[log]').apply(this, arguments);
    }

    error() {
        console.error.bind(this, '[error]').apply(this, arguments);
    }

    // -------------------- INIT ----------------------

    async onInit() {
        try {
            this.log(`${this.homey.manifest.id} - ${this.homey.manifest.version} started...`);

            await this.initSettings();
            actions.init(this.homey);
        } catch (error) {
            this.homey.app.log(error);
        }
    }

    async initSettings() {
        this.animation = undefined;

        let lastAnimationFrames = this.homey.settings.get(LAST_SETTING_KEY);

        if (lastAnimationFrames == null) {
            lastAnimationFrames = createSolidAnimation({ r: 0, g: 100, b: 0 });
        }

        await this.registerAnimation(lastAnimationFrames);
    }

    async registerAnimation(frames) {
        this.homey.settings.set(LAST_SETTING_KEY, frames);

        if (this.animation != undefined) {
            this.log('Updating frames ...');
            return await this.animation.updateFrames(frames);
        } else {
            this.log('Registering animation ...');
            this.animation = await this.homey.ledring.createAnimation(getAnimationConf(frames));

            this.log('Registering screensaver ...');

            return await this.homey.ledring.registerScreensaver('leditbe', this.animation);
        }
    }
}

module.exports = LedItBe;
