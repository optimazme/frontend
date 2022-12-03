import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Token, Prompt } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("updateToken")
  async updateToken(@Body() body: Token) {
    return this.appService.updateTokenMetadata(body)
  }

  @Post("getAiImage")
  async getAiImage(@Body() body: Prompt) {
    return this.appService.getAiImage(body.prompt)
  }
}
