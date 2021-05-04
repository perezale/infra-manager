import { Module } from '@nestjs/common';
import { EC2 } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { StatusController } from './status/status.controller';
import { StatusService } from './status/status.service';
import { LaunchController } from './launch/launch.controller';
import { LaunchService } from './launch/launch.service';

@Module({
  imports: [AwsSdkModule.forFeatures([EC2])],
  controllers: [StatusController, LaunchController],
  providers: [StatusService, LaunchService]
})
export class Ec2Module {}
