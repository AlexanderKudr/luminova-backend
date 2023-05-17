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
exports.updateRefreshTokenInDB = void 0;
const utils_1 = require("../../utils");
const updateRefreshTokenInDB = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield utils_1.prisma.user.updateMany({
            where: { refreshToken },
            data: { refreshToken },
        });
        if (!user) {
            throw new Error("User not found");
        }
        yield (0, utils_1.handleDisconnectDB)();
        return user;
    }
    catch (error) {
        yield (0, utils_1.handleErrorDB)(error);
        return null;
    }
});
exports.updateRefreshTokenInDB = updateRefreshTokenInDB;
//# sourceMappingURL=updateRefreshTokens.js.map