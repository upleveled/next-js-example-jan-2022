//
//
// Warning: Don't use this file anymore! It is now possible to use
// Emotion with SWC 🎉 https://nextjs.org/docs/advanced-features/compiler#emotion
// 
// Check the CSS-in-JS cheatsheet for the latest recommendation
//
//
module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: ['@emotion/babel-plugin'],
};
