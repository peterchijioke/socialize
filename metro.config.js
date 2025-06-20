const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const {assetExts, sourceExts} = defaultConfig.resolver;
  return mergeConfig(defaultConfig, {
    resolver: {
      assetExts: [...assetExts, 'mp4'],
      sourceExts: sourceExts.filter(ext => ext !== 'mp4'),
    },
    resetCache: true,
  });
};

module.exports = config();
