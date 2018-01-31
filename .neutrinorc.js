module.exports = {
  use: [
    '@neutrinojs/airbnb-base',
    [
      '@neutrinojs/web',
      {
        html: {
          title: 'sliding-puzzle-game'
        }
      }
    ],
    (neutrino) => neutrino.config.module
      .rule('lint')
      .use('eslint')
      .tap(options => Object.assign({}, options, {
        rules: {
          'no-console': 'off'
        }
      }))
  ]
};
