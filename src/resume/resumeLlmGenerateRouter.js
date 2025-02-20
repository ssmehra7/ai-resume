"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeLlmGenerateRouter = void 0;
const db_1 = require("../config/db");
const http_errors_1 = __importDefault(require("http-errors"));
const geminiconfig_1 = require("../config/geminiconfig");
const resumeLlmGenerateRouter = async (req, res, next) => {
    //@ts-ignore
    const userId = req.user.sub;
    const resumeId = req.params.resumeId;
    const resume = await db_1.prisma.resume.findFirst({
        where: {
            id: resumeId,
            userId: userId,
        }
    });
    if (!resume) {
        const error = (0, http_errors_1.default)(401, "Resume is not Found");
        return next(error);
    }
    if (resume.userId !== userId) {
        const error = (0, http_errors_1.default)(400, "User is not logged in");
        return next(error);
    }
    const text = resume.text;
    //generate the google api thingy;
    const prompt = text;
    const result = await geminiconfig_1.model.generateContent(prompt);
    // console.log("text result" , result.response.text()); 
    const resultJSON = JSON.parse(result.response.text());
    console.log(resultJSON);
    try {
        const response = await db_1.prisma.llmOutput.create({
            data: {
                resumeId,
                email: resultJSON.email,
                education: resultJSON.education,
                experience: resultJSON.experience,
                skills: resultJSON.skills,
                summary: resultJSON.summary,
            }
        });
        res.status(200).json({
            message: "LLM generator works fine",
            id: response.id,
            response,
        });
        return;
    }
    catch (error) {
        console.log("error is --> ", error);
        return;
    }
};
exports.resumeLlmGenerateRouter = resumeLlmGenerateRouter;
