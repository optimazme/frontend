import { Injectable } from '@nestjs/common';
import { bananApiResponse, modelParameters, Token } from './types';
import axios from 'axios';
import * as banana from '@banana-dev/banana-dev'
import * as dotenv from 'dotenv'

dotenv.config()

const fs = require('fs')
const FormData = require('form-data')
const { Readable } = require("stream");

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async updateTokenMetadata(token: Token) {
    const endpointString = `https://api.niftykit.com/drops/tokens/${token.id}`
    console.log(endpointString)
    console.log(token)
    try {
      const { data } = await axios.put<Token>(
      endpointString,
      token.data,
      {
        headers: {
          'x-api-key': process.env.NIFTYKIT_API_KEY,
        },
      }
    ) } catch (err) {
      console.log(err)
    };

  }

  async getAiImage(prompt: string){
    const apiKey = process.env.BANANA_API_KEY
    const modelKey = process.env.STABILITY_AI_MODEL
    const modelParameters: modelParameters = {
      "prompt": prompt,
      "num_inference_steps":50,
      "guidance_scale":9,
      "height":512,
      "width":512,
      "seed":3242
    }
    try {
    const bananRes: any | bananApiResponse = await banana.run(apiKey, modelKey, modelParameters)
    const imageByteString = bananRes.modelOutputs[0].image_base64
    const imageBytes = Buffer.from(imageByteString, 'base64');
    const pinataRes = await this.pinFileToIPFS(imageBytes)
    return(pinataRes.data)
    } catch(err) { console.log(err) }
    return "failed to upload ai image :("
  }

  async pinFileToIPFS (bytes: Buffer) {

    const JWT = process.env.PINATA_JWT
    
    const formData = new FormData();
    
    const stream = Readable.from(bytes);
    formData.append('file', stream, {
      filepath: 'FILENAME.png'
    })
    
    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: 1000000000,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }
      });
      console.log(res.data);
      return res
    } catch (error) {
      console.log(error);
    }
}
}