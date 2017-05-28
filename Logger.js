const fs = require("fs");
const path = require("path");
const env = process.env.NODE_ENV;
const isEnvDevelopment = env === "development";
const isEnvProduction = env === "production";

class Logger {

    constructor(config) {
        this.config = config;
        this.logPath = path.resolve(config.folder, config.file);
        this.writeStream = null;
    }

    error(line) {
        this.log("ERROR", line);
    }

    warn(line) {
        this.log("WARNING", line);
    }

    info(line) {
        this.log("INFO", line);
    }

    log(level, line) {

        let logLine = `[${new Date()}] [${level}] ${line}\n`;

        if (isEnvDevelopment) {

            console.log(logLine);

        } else if (isEnvProduction) {

            if (!this.writeStream) {
                this.writeStream = fs.createWriteStream(this.logPath, {flags: "a"});
            }

            this.writeStream.write(logLine, "utf8");

        }

    }

}

module.exports = Logger;
