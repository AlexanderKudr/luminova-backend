var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { handleDisconnectDB, handleErrorDB, prisma } from "../utils/index.js";
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, accessToken, refreshToken } = user;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            console.error(`User with email ${email} already exists`);
            return null;
        }
        const newUser = yield prisma.user.create({
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
        const errorCheck = error instanceof PrismaClientKnownRequestError;
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
        yield handleDisconnectDB();
    }
    catch (error) {
        yield handleErrorDB(error);
    }
});
const checkUserInDB = (field, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findFirst({
            where: { [field]: value },
        });
        yield handleDisconnectDB();
        return user;
    }
    catch (error) {
        yield handleErrorDB(error);
        return null;
    }
});
const updateUserTokensInDB = ({ email, accessToken, refreshToken }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.updateMany({
            where: { email: email },
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        yield handleDisconnectDB();
    }
    catch (error) {
        yield handleErrorDB(error);
    }
});
const updateRefreshTokenInDB = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.updateMany({
            where: { refreshToken },
            data: { refreshToken },
        });
        if (!user) {
            throw new Error("User not found");
        }
        yield handleDisconnectDB();
        return user;
    }
    catch (error) {
        yield handleErrorDB(error);
        return null;
    }
});
const clearUserTokensInDB = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.updateMany({
            where: { refreshToken },
            data: { accessToken: null, refreshToken: null },
        });
        if (!user) {
            throw new Error("User not found");
        }
        yield handleDisconnectDB();
    }
    catch (error) {
        yield handleErrorDB(error);
    }
});
export { handleCreateUser, checkUserInDB, updateUserTokensInDB, updateRefreshTokenInDB, clearUserTokensInDB, };
//# sourceMappingURL=prisma.js.map