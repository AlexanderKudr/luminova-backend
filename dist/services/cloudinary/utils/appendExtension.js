"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendJpeg = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// const directoryPath = "../../../../src/assets";
const appendJpeg = (dirPath) => {
    fs_1.default.readdir(dirPath, (err, files) => {
        if (err) {
            console.error("Error: ", err);
            return;
        }
        files.forEach((file) => {
            const prevPath = path_1.default.join(dirPath, file);
            const nextPath = path_1.default.join(dirPath, file + ".jpeg");
            fs_1.default.rename(prevPath, nextPath, (err) => {
                if (err) {
                    console.error("Error renaming file: ", err);
                }
                else {
                    console.log(`Renamed file ${prevPath} to ${nextPath}`);
                }
            });
        });
    });
};
exports.appendJpeg = appendJpeg;
// appendJpeg(directoryPath);
//# sourceMappingURL=appendExtension.js.map