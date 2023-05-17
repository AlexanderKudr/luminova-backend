"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedAccess = void 0;
const protectedAccess = (req, res) => {
    try {
        res.send({ message: "Protected access successfully" });
    }
    catch (error) {
        res.status(500).send({ error: "Protected access error" });
    }
};
exports.protectedAccess = protectedAccess;
//# sourceMappingURL=protected.js.map