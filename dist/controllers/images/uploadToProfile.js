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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToProfile = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: "src/assets",
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
}).array("file", 10);
const uploadToProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(500).send({ error: "Error uploading image to Server" });
                return;
            }
            else {
                //write logic to receive user name on frontend and then continue here
                const { userName, category } = req.body;
                const files = req.files;
                console.log(files[0].path, "req.files");
                const url = files[0].path;
                const fileName = files[0].filename;
                const uploadToCDN = yield cloudinary_1.v2.uploader.upload(url, {
                    use_filename: true,
                    public_id: fileName,
                    folder: category,
                });
            }
        }));
        // const uploadResult = await cloudinary.uploader.upload(url, {
        //   use_filename: true,
        //   public_id: title,
        //   folder: "gallery",
        // });
        // const contextResult = (await cloudinary.uploader.add_context(
        //   "favorite=false",
        //   [uploadResult.public_id]
        // )) as UploadApiErrorResponse;
        // res.json(contextResult);
        res.send({ message: "success" });
    }
    catch (error) {
        res.status(500).send("Error adding image to Cloudinary");
    }
});
exports.uploadToProfile = uploadToProfile;
//# sourceMappingURL=uploadToProfile.js.map