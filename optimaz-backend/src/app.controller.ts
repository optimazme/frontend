import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Token, Prompt } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("getAiArtMetadata")
  async getAiArtMetadata() {
    return this.appService.getAiPassMetadata()
  }

  @Get("getNftUrl/:walletAddress")
  getNftByWalletAddress(@Param("walletAddress") walletAddress: string) {
    return this.appService.checkForGamePassOwner(walletAddress)
  }

  @Get("getAiIndex/:walletAddress")
  getTransactionByHash(@Param("walletAddress") walletAddress: string) {
    return this.appService.checkForAiOwner(walletAddress)
  }

  @Post("updateGameTokenMetadata")
  async updateGameTokenMetadata(@Body() body: Prompt) {
    return this.appService.updateGameTokenMetadata(body.tokenId, body.prompt)
  }

  @Post("updateAiTokenMetadata")
  async updateAiTokenMetadata(@Body() body: Prompt) {
    return this.appService.updateAiTokenMetadata(body.tokenId, body.prompt)
  }

  @Post("getAiImage")
  async getAiImage(@Body() body: Prompt) {
    return this.appService.getAiImage(body.prompt)
  }

}
