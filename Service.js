const express = require("express");
const bodyParser = require("body-parser");

class Service {

    constructor(config, mongodb, authProvider) {
        this.app = express();
        this.config = config;
        this.dependencies = {mongodb, authProvider};
        this.setupExpress();
        this.setupRoutes();
    }

    setupExpress() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.set("json spaces", 2);
    }

    setupRoutes() {
        const { router } = this.config;
        const routes = router.getRoutes(express, this.dependencies);
        this.app.use(routes);
    }

    start() {
        const isEnvDevelopment = this.config.nodeEnv === "development";
        const { host, port } = this.config.endpoint;

        return this.app.listen(port, host, () => {
            if (isEnvDevelopment) console.log(`server listening at: http://${host}:${port}/`);
        });
    }

}

module.exports = Service;
