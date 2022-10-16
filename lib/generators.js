exports.createSolidAnimation = function (rgb) {
    let frame = [];
    for (let pixel = 0; pixel < 24; pixel++) {
        frame.push(rgb);
    }
    return [frame];
};

exports.createFlashAnimation = function (rgb_1, rgb_2) {
    let frames = [];
    for (let frameIndex = 0; frameIndex < 24; frameIndex++) {
        let frame = [];
        for (let pixelIndex = 0; pixelIndex < 24; pixelIndex++) {
            if (frameIndex < 4) {
                frame.push(rgb_1);
            } else {
                frame.push(rgb_2);
            }
        }
        frames.push(frame);
    }
    return frames;
};

exports.createStroboscopeAnimation = function (rgb_1, rgb_2) {
    let frames = [];
    for (let frameIndex = 0; frameIndex < 24; frameIndex++) {
        let frame = [];
        for (let pixelIndex = 0; pixelIndex < 24; pixelIndex++) {
            if (frameIndex % 6 == 0) {
                frame.push(rgb_1);
            } else {
                frame.push(rgb_2);
            }
        }
        frames.push(frame);
    }
    return frames;
};

exports.createLighthouseAnimation = function (rgb_1, rgb_2) {
    let frames = [];
    for (let frameIndex = 0; frameIndex < 24; frameIndex++) {
        let frame = [];
        for (let pixelIndex = 0; pixelIndex < 24; pixelIndex++) {
            let offset = Math.floor((pixelIndex + frameIndex) / 6) % 4;
            if (offset == 0 || offset == 2) {
                frame.push(rgb_1);
            } else {
                frame.push(rgb_2);
            }
        }
        frames.push(frame);
    }
    return frames;
};

exports.createSearchlightAnimation = function (rgb_1, rgb_2) {
    let frames = [];
    for (let frameIndex = 0; frameIndex > -24; frameIndex--) {
        let frame = [];
        for (let pixelIndex = 0; pixelIndex < 24; pixelIndex++) {
            let offset = Math.floor((pixelIndex + frameIndex) / 3) % 8;
            if (offset == 0) {
                frame.push(rgb_1);
            } else {
                frame.push(rgb_2);
            }
        }
        frames.push(frame);
    }
    return frames;
};

exports.createButterflyAnimation = function (rgb_1, rgb_2) {
    let frames = [];
    for (let frameIndex = 0; frameIndex < 24; frameIndex++) {
        let frame = [];
        for (let pixelIndex = 0; pixelIndex < 24; pixelIndex++) {
            if (frameIndex < 12) {
                if (pixelIndex < 12) {
                    frame.push(rgb_1);
                } else {
                    frame.push(rgb_2);
                }
            } else {
                if (pixelIndex < 12) {
                    frame.push(rgb_2);
                } else {
                    frame.push(rgb_1);
                }
            }
        }
        frames.push(frame);
    }
    return frames;
};
