"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const _1 = require(".");
cloudinary_1.v2.config({
    cloud_name: _1.config.cloud_name,
    api_key: _1.config.api_key,
    api_secret: _1.config.api_secret, // Click 'View API Keys' above to copy your API secret
});
exports.default = cloudinary_1.v2;
