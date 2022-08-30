const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    devtool: "none",
    optimization: {
        runtimeChunk: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: ["default", { discardComments: { removeAll: true } }]
                },
                canPrint: true
            })
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static'
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
});
