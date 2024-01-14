export default [
  { method: 'turnOn' },
  {
    method: 'setLight',
    values: {
      rgb: 0x3870f2,
      luminance: 100,
    },
  },
  {
    delay: 1000,
    method: 'setLight',
    values: {
      rgb: 0x3870f2,
      luminance: 100,
    },
  },
  {
    delay: 1000,
    method: 'setLight',
    values: {
      rgb: 0xb8cdff,
      luminance: 100,
    },
  },
];
