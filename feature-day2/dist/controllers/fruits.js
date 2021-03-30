"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fruit_1 = require("../models/fruit");
class controller {
    getAllFruits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createRes = yield fruit_1.default.create({ name: 'semangko', is_sweet: true, quantity: 12 });
                console.log(`createRes`, createRes);
                res.send('fruit has been created');
            }
            catch (error) {
                console.log(`error`, error);
                res.send('created failed');
            }
        });
    }
}
exports.default = new controller();
//# sourceMappingURL=fruits.js.map