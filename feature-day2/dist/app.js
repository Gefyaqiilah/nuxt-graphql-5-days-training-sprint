"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fruits_js_1 = require("./routes/fruits.js");
class App {
    constructor() {
        this.app = express();
        this.applyMiddleware();
        this.applyRoutes();
    }
    applyMiddleware() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
    applyRoutes() {
        this.app.use('/fruits', fruits_js_1.default);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map