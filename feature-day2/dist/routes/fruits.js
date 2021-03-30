"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fruits_1 = require("../controllers/fruits");
const router = express_1.Router();
router.get('/', fruits_1.default.getAllFruits);
exports.default = router;
//# sourceMappingURL=fruits.js.map