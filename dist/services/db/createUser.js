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
exports.handleCreateUser = void 0;
const library_1 = require("@prisma/client/runtime/library");
const handleDB_1 = require("./handleDB");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, accessToken, refreshToken } = user;
    try {
        const existingUser = yield handleDB_1.prisma.user.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            console.error(`User with email ${email} already exists`);
            return null;
        }
        const newUser = yield handleDB_1.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                accessToken: accessToken,
                refreshToken: refreshToken,
                confirmedemail: false,
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
        yield (0, handleDB_1.handleDisconnectDB)();
    }
    catch (error) {
        yield (0, handleDB_1.handleErrorDB)(error);
    }
});
exports.handleCreateUser = handleCreateUser;
//# sourceMappingURL=createUser.js.map