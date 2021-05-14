import { Body, Controller, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InstanceStateChange } from 'aws-sdk/clients/ec2';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { PermissionService } from '../permission/permission.service';
import { Ec2LaunchAction, Ec2LaunchDto } from './dto/LaunchDto';
import { LaunchService } from './launch.service';

@ApiBearerAuth()
@ApiTags('ec2')
@Controller('ec2/instances')
export class LaunchController {

  constructor(
    private launchService: LaunchService,
    private permissionService: PermissionService,) {}

  @Post(':id/launch')
  async getStatus(
      @Body() body : Ec2LaunchDto,
      @Param('id') id : string, 
      @AuthenticatedUser() userInfo
      ): Promise<InstanceStateChange> {
    if (!this.permissionService.isAllowed(userInfo.email, id)) {
      throw new UnauthorizedException();
    }
    switch(body.action){
      case Ec2LaunchAction.Start:
        return await this.launchService.start(id);
      case Ec2LaunchAction.Stop:
        return await this.launchService.stop(id);
    }
    
  }

}
