const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const ROOT_DIR = path.resolve(__dirname, "../..");
const STORE_DIR = path.resolve(ROOT_DIR, "src/store");
const DIST_DIR = path.resolve(ROOT_DIR, "build/arquivos");

const NAME_PROJECT = process.env.OUTPUT_NAME;

module.exports = {
    stats: "errors-warnings",
    entry: {
        [NAME_PROJECT]: [path.join(STORE_DIR, "index")]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
        alias: {
            stylesheets: path.join(ROOT_DIR, "src/assets/css"),
            javascripts: path.join(ROOT_DIR, "src/assets/js"),
            images: path.join(ROOT_DIR, "src/assets/images"),
            "~p": path.join(STORE_DIR, "pages"),
            "~c": path.join(STORE_DIR, "components"),
            "react": "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
            "react/jsx-runtime": "preact/jsx-runtime"
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: "babel-loader",
                exclude: [path.resolve(ROOT_DIR, "node_modules")],
            },
            // css
            {
                test: /\.css$/,
                include: /node_modules/,
                loader: ["style-loader", "css-loader"]
            },
            // sass
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "css-hot-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [autoprefixer("last 4 version")],
                            sourceMap: true,
                            includePaths: [
                                path.resolve(__dirname, "../../node_modules/compass-mixins/lib")
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            includePaths: [
                                path.resolve(__dirname, "../../node_modules/compass-mixins/lib")
                            ]
                        }
                    },
                    // resources loader
                    {
                        loader: "sass-resources-loader",
                        options: {
                            resources: require(path.resolve(__dirname, "../files/utils"))
                        }
                    }
                ]
            },
            // images
            {
                test: /\.(png|ico|gif|svg|jpe?g)(\?[a-z0-9]+)?$/,
                use: "url-loader",
            },
            // fonts
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ["url-loader"] },
        ],
    },
    output: {
        path: DIST_DIR,
        publicPath: "/dist/",
        filename: `[name].min.js`,
        jsonpFunction: `webpackJsonp_corebiz`,
    },
    externals: {
        $: "jQuery",
        jquery: "jQuery",
        "window.jquery": "jQuery"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `[name].min.css`
        })
    ]
};
