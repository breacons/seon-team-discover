const {
  override,
  fixBabelImports,
  // addLessLoader,
  addWebpackPlugin,
  adjustStyleLoaders,
  addWebpackAlias,
  useBabelRc,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('customize-cra');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addLessLoader = require('customize-cra-less-loader');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { alias, configPaths } = require('react-app-rewire-alias');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getThemeVariables } = require('antd/dist/theme');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = override((config, env) => {
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  })(config, env);
  useBabelRc()(config, env);
  // adjustStyleLoaders(({ use: [, , postcss] }) => {
  //   console.log(postcss);
  //   const postcssOptions = postcss.options;
  //   postcss.options = { postcssOptions };
  // })(config, env);
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {
          ...getThemeVariables({
            dark: false, // Enable dark mode
            compact: false, // Enable compact mode
          }),
          '@primary-color': 'rgb(0, 106, 255)', // primary color for all components
          // '@secondary-color': '#6aff00', // primary color for all components
          // '@link-color': '#74FBFD', // link color #1890ff #82BEE4
          // '@link-hover-color': '#82BEE4',
          // '@background-color-light': ' #23213A',
          // '@success-color': '#52c41a', // success state color
          // '@warning-color': '#faad14', // warning state color
          // '@error-color': '#f5222d', // error state color
          // '@font-size-base': '14px', // major text font size
          // '@heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
          // '@text-color': 'rgba(0, 0, 0, 0.65)', // major text color
          // '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
          // '@disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
          // '@border-radius-base': '4px', // major border radius
          // '@border-color-base': '#d9d9d9', // major border color
          // '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // major shadow for layers},
          '@layout-header-background': '#ffffff',
        },
      },
    },
  })(config, env);

  const aliasMap = configPaths('./tsconfig.paths.json'); // or jsconfig.paths.json
  alias(aliasMap)(config, env);

  // addWebpackAlias({
  //   ['joi']: path.resolve(__dirname, 'node_modules/joi/lib/index.js'),
  // })(config, env);

  return config;
});

// module.exports.jest = aliasJest(aliasMap)
