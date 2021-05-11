import { Controller, Get, Param, Query, Req, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Instance, InstanceState } from 'aws-sdk/clients/ec2';
import {  AuthenticatedUser, Public, Resource, ResourceGuard, Roles,  } from 'nest-keycloak-connect';
import { userInfo } from 'os';
import { InstanceDetailDto } from './dto/InstanceDetailDto';
import { StatusService } from './status.service';

@ApiBearerAuth()
@ApiTags('ec2')
@Controller('ec2/instances')
export class StatusController {

  constructor(private statusService: StatusService) {}

  @Get(':id/status')
  @Roles('user','admin')
  async getStatus(@Param('id') id : string): Promise<InstanceState> {
    console.log('req.kauth.grant');
    return await this.statusService.getStatus(id);
  }

  @Get('/')
  async getAll(@AuthenticatedUser() userInfo): Promise<InstanceDetailDto[]> {
    console.log(userInfo);
    console.log(userInfo.resource_access['infra-api']);
    return await this.statusService.getByUser(userInfo.email);
  }
}
