const { hexToRgb } = require('../helpers');
const { createSolidAnimation, createFlashAnimation, createStroboscopeAnimation, createLighthouseAnimation, createSearchlightAnimation, createButterflyAnimation } = require('../generators');

exports.init = async function (homey) {
    try {
        const solidAction = homey.flow.getActionCard('solid');
        solidAction.registerRunListener((args, state) => {
            const rgb = hexToRgb(args.color);
            return homey.app.registerAnimation(createSolidAnimation(rgb));
        });

        const flashAction = homey.flow.getActionCard('flash');
        flashAction.registerRunListener((args, state) => {
            const rgb_1 = hexToRgb(args.color_1);
            const rgb_2 = hexToRgb(args.color_2);
            return homey.app.registerAnimation(createFlashAnimation(rgb_1, rgb_2));
        });

        const stroboscopeAction = homey.flow.getActionCard('stroboscope');
        stroboscopeAction.registerRunListener((args, state) => {
            const rgb_1 = hexToRgb(args.color_1);
            const rgb_2 = hexToRgb(args.color_2);
            return homey.app.registerAnimation(createStroboscopeAnimation(rgb_1, rgb_2));
        });

        const lighthouseAction = homey.flow.getActionCard('lighthouse');
        lighthouseAction.registerRunListener((args, state) => {
            const rgb_1 = hexToRgb(args.color_1);
            const rgb_2 = hexToRgb(args.color_2);
            return homey.app.registerAnimation(createLighthouseAnimation(rgb_1, rgb_2));
        });

        const searchlightAction = homey.flow.getActionCard('searchlight');
        searchlightAction.registerRunListener((args, state) => {
            const rgb_1 = hexToRgb(args.color_1);
            const rgb_2 = hexToRgb(args.color_2);
            return homey.app.registerAnimation(createSearchlightAnimation(rgb_1, rgb_2));
        });

        const butterflyAction = homey.flow.getActionCard('butterfly');
        butterflyAction.registerRunListener((args, state) => {
            const rgb_1 = hexToRgb(args.color_1);
            const rgb_2 = hexToRgb(args.color_2);
            return homey.app.registerAnimation(createButterflyAnimation(rgb_1, rgb_2));
        });
    } catch (err) {
        homey.app.error(err);
    }
};

// ---------------------------------------END OF FILE----------------------------------------------------------
