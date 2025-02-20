"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResumeController = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const fs_1 = __importDefault(require("fs"));
const node_path_1 = __importDefault(require("node:path"));
const db_1 = require("../config/db");
const uploadResumeController = async (req, res, next) => {
    //@ts-ignore
    const user = req.user;
    const files = req.files;
    // const coverPdfMimeType = files.resumePdf[0].mimetype.split('/').at(-1);
    const fileName = files.resumePdf[0].filename;
    const filePath = node_path_1.default.resolve(__dirname, '../../public/data/uploads', fileName);
    const bufferPdf = fs_1.default.readFileSync(filePath);
    const pdfParserResponse = await (0, pdf_parse_1.default)(bufferPdf);
    const resumeText = pdfParserResponse.text;
    const uploadResult = await cloudinary_1.default.uploader.upload(filePath, {
        filename_override: fileName,
        folder: 'resume-pdf',
        format: "pdf",
        resource_type: "raw"
    });
    const data = await db_1.prisma.resume.create({
        data: {
            userId: user.sub,
            text: resumeText,
            resumePdf: uploadResult.url,
        }
    });
    await fs_1.default.promises.unlink(filePath);
    res.json({
        message: "Resume Uploaded successfully",
        data,
    });
};
exports.uploadResumeController = uploadResumeController;
