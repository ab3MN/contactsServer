const Jimp = require('jimp');
const path = require('path');

module.exports = {
  getAvatarPath: async (img, avatarPath, name) => {
    try {
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
        largeAvatarURL:
          'http://localhost:' + process.env.PORT + avatarPath + 'Large_' + name,
        smallAvatarURL:
          'http://localhost:' + process.env.PORT + avatarPath + 'Small_' + name,
      };
    } catch (e) {
      throw new Error(e);
    }
  },
};
