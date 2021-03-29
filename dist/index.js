"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const port = process.env.PORT || 3000;
App_1.default.listen(port, () => console.log('Server running on port:' + port));
//# sourceMappingURL=index.js.map