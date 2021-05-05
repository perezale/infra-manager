import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';
import { AppService } from './app.service';

@ApiTags("health")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  @Unprotected()
  health(): Object {
    return this.appService.health();
  }
}
