import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Instance, InstanceState } from 'aws-sdk/clients/ec2';
import { Roles } from 'nest-keycloak-connect';
import { InstanceDetailDto } from './dto/InstanceDetailDto';
import { StatusService } from './status.service';

@ApiBearerAuth()
@ApiTags('ec2')
@Controller('ec2/instances')
export class StatusController {

  constructor(private statusService: StatusService) {}

  @Get(':id/status')
  @Roles('user')
  async getStatus(@Param('id') id : string): Promise<InstanceState> {
    return await this.statusService.getStatus(id);
  }

  @Get('/')
  @Roles('user')
  async getAll(): Promise<InstanceDetailDto[]> {
    return await this.statusService.getAll();
  }
}
