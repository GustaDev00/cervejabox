const fs = require("fs");
const path = require("path");
const merge = require("webpack-merge");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const md5File = require("md5-file");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const common = require("./webpack.common.js");

LiveReloadPlugin.prototype.done = function done(stats) {
    this.fileHashes = this.fileHashes || {};

    const fileHashes = {};
    for (let file of Object.keys(stats.compilation.assets)) {
        fileHashes[file] = md5File.sync(stats.compilation.assets[file].existsAt);
    }

    const toInclude = Object.keys(fileHashes).filter(file => {
        if (this.ignore && file.match(this.ignore)) {
            return false;
        }

        return !(file in this.fileHashes) || this.fileHashes[file] !== fileHashes[file];
    });

    if (this.isRunning && toInclude.length) {
        this.fileHashes = fileHashes;
        console.log("Live Reload: Reloading " + toInclude.join(", "));
        setTimeout(
            function onTimeout() {
                this.server.notifyClients(toInclude);
            }.bind(this)
        );
    }
};

module.exports = merge(common, {
    mode: "development",
    devtool: "eval",
    plugins: [
        new ProgressBarPlugin({
            format: "Build [:bar] :percent (:elapsed seconds)",
            clear: false
        }),
        new LiveReloadPlugin({
            key: fs.readFileSync(path.resolve(__dirname, "../files/server.key")),
            cert: fs.readFileSync(path.resolve(__dirname, "../files/server.crt")),
            hostname: "localhost",
            protocol: "https",
            port: 3001,
            appendScriptTag: true
        })
    ]
});
