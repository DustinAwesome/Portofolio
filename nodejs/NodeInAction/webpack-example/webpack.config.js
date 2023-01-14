const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./app/index.jsx",
    output: { 
        path: path.resolve(__dirname, "dist"),
        filename: "dist/bundle.js",
        publicPath: "/assets/",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env", "@babel/react"],
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        static: "./dist",
    },
};

// run webpack by typing: ./node_modules/.bin/webpack
