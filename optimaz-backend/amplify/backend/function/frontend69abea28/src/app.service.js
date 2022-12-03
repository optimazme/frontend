"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const banana = require("@banana-dev/banana-dev");
const dotenv = require("dotenv");
dotenv.config();
const fs = require('fs');
const FormData = require('form-data');
const { Readable } = require("stream");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    async updateTokenMetadata(token) {
        const endpointString = `https://api.niftykit.com/drops/tokens/${token.id}`;
        console.log(endpointString);
        console.log(token);
        try {
            const { data } = await axios_1.default.put(endpointString, token.data, {
                headers: {
                    'x-api-key': process.env.NIFTYKIT_API_KEY,
                },
            });
        }
        catch (err) {
            console.log(err);
        }
        ;
    }
    async getAiImage(prompt) {
        const apiKey = process.env.BANANA_API_KEY;
        const modelKey = process.env.STABILITY_AI_MODEL;
        const modelParameters = {
            "prompt": prompt,
            "num_inference_steps": 50,
            "guidance_scale": 9,
            "height": 512,
            "width": 512,
            "seed": 3242
        };
        try {
            const bananRes = await banana.run(apiKey, modelKey, modelParameters);
            const imageByteString = bananRes.modelOutputs[0].image_base64;
            const imageBytes = Buffer.from(imageByteString, 'base64');
            const pinataRes = await this.pinFileToIPFS(imageBytes);
            return (pinataRes.data);
        }
        catch (err) {
            console.log(err);
        }
        return "failed to upload ai image :(";
    }
    async pinFileToIPFS(bytes) {
        const JWT = process.env.PINATA_JWT;
        const formData = new FormData();
        const stream = Readable.from(bytes);
        formData.append('file', stream, {
            filepath: 'FILENAME.png'
        });
        const metadata = JSON.stringify({
            name: 'File name',
        });
        formData.append('pinataMetadata', metadata);
        const options = JSON.stringify({
            cidVersion: 0,
        });
        formData.append('pinataOptions', options);
        try {
            const res = await axios_1.default.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: 1000000000,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    Authorization: JWT
                }
            });
            console.log(res.data);
            return res;
        }
        catch (error) {
            console.log(error);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
