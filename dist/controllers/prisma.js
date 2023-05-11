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
exports.clearUserTokensInDB = exports.updateRefreshTokenInDB = exports.updateUserTokensInDB = exports.checkUserInDB = exports.handleCreateUser = void 0;
const utils_1 = require("../utils");
const library_1 = require("@prisma/client/runtime/library");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, accessToken, refreshToken } = user;
    try {
        const existingUser = yield utils_1.prisma.user.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            console.error(`User with email ${email} already exists`);
            return null;
        }
        const newUser = yield utils_1.prisma.user.create({
            data: {
                email: email,
                password: password,
                accessToken: accessToken,
                refreshToken: refreshToken,
                favoriteImages: { create: [] },
            },
        });
        return newUser;
    }
    catch (error) {
        const errorCheck = error instanceof library_1.PrismaClientKnownRequestError;
        if (errorCheck && error.code === "P2002") {
            console.error("User with email already exists");
        }
        else {
            console.error("Error creating user:", error);
        }
        return null;
    }
});
const handleCreateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createUser(user);
        yield (0, utils_1.handleDisconnectDB)();
    }
    catch (error) {
        yield (0, utils_1.handleErrorDB)(error);
    }
});
exports.handleCreateUser = handleCreateUser;
const checkUserInDB = (field, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield utils_1.prisma.user.findFirst({
            where: { [field]: value },
        });
        yield (0, utils_1.handleDisconnectDB)();
        return user;
    }
    catch (error) {
        yield (0, utils_1.handleErrorDB)(error);
        return null;
    }
});
exports.checkUserInDB = checkUserInDB;
const updateUserTokensInDB = ({ email, accessToken, refreshToken }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield utils_1.prisma.user.updateMany({
            where: { email: email },
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        yield (0, utils_1.handleDisconnectDB)();
    }
    catch (error) {
        yield (0, utils_1.handleErrorDB)(error);
    }
});
exports.updateUserTokensInDB = updateUserTokensInDB;
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
const clearUserTokensInDB = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield utils_1.prisma.user.updateMany({
            where: { refreshToken },
            data: { accessToken: null, refreshToken: null },
        });
        if (!user) {
            throw new Error("User not found");
        }
        yield (0, utils_1.handleDisconnectDB)();
    }
    catch (error) {
        yield (0, utils_1.handleErrorDB)(error);
    }
});
exports.clearUserTokensInDB = clearUserTokensInDB;
//# sourceMappingURL=prisma.js.map