const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

class MongoDB {

    constructor(config) {
        this.config = config;
        this.connection = this.getConnection();
        this.models = this.compileModels();
    }

    getConnection() {
        const { host, port, name } = this.config;
        const connection = mongoose.createConnection(host, name, port);
        connection.on("error", (err) => console.log("error connecting to the mongodb instance"));
        return connection;
    }

    compileModels() {
        return this.config.models.compile(this.connection, mongoose);
    }

    getModels() {
        return this.models;
    }
}

module.exports = MongoDB;
