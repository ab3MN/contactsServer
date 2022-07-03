const Jimp = require('jimp');
const path = require('path');

module.exports = {
  getAvatarPath: async (img, avatarPath, name) => {
    try {
      console.log({ img, avatarPath, name });
      const _img = await Jimp.read(img);
      _img
        .resize(250, 250)
        .quality(60)
        .write(
          path.join(__dirname, '../public' + avatarPath) + 'Large_' + name
        );
      _img
        .resize(80, 80)
        .quality(60)
        .write(
          path.join(__dirname, '../public' + avatarPath) + 'Small_' + name
        );
      return {
        largerAvatarURL: avatarPath + 'Large_' + name,
        smallAvatarURL: avatarPath + 'Small_' + name,
      };
    } catch (e) {
      console.log(e);
    }
  },
};
