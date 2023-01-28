const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

//

module.exports = {
    devtool: "source-map",
    output: {
        filename: "[name].min.js",
        assetModuleFilename: "img/[hash][ext][query]",
        clean: true,
    },
    entry: {
        main: "./src/index.jsx",
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@root": path.resolve(__dirname, "./"),
            "@src": path.resolve(__dirname, "./src/"),
            "@image": path.resolve(__dirname, "./assets/fonts/"),
            "@image": path.resolve(__dirname, "./assets/json/"),
            "@image": path.resolve(__dirname, "./assets/images/"),
            "@icon": path.resolve(__dirname, "./assets/icons/"),
            "@ace": path.resolve(__dirname, "./src/ace/"),
            "@block": path.resolve(__dirname, "./src/blocks/"),
            "@hook": path.resolve(__dirname, "./src/hooks/"),
            "@theme": path.resolve(__dirname, "./src/theme/"),
            "@utility": path.resolve(__dirname, "./src/utilities/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                "lodash",
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(css|scss)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" },
                    },
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: ["autoprefixer"],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2)$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[hash][ext][query]",
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].min.css" }),
        new webpack.ProvidePlugin({
            utils: path.resolve(
                path.join(__dirname, "./src/utilities/helpers.jsx")
            ),
            process: "process/browser.js",
        }),
        new BrowserSyncPlugin({
            proxy: "http://localhost/_experiments/react.calendar/",
        }),
    ],
};
