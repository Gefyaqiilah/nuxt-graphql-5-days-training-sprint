"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = require("dotenv");
class App {
    constructor() {
        dotenv_1.config();
        this.port = process.env.PORT;
    }
    serve() {
        app_1.default.listen(this.port, () => console.log('Server running on port :' + this.port));
    }
}
const Server = new App();
Server.serve();
//# sourceMappingURL=index.js.map