import { ApiProperty } from "@nestjs/swagger";

export enum Ec2LaunchAction {
  Start = 'start',
  Stop = 'stop'
}

export class Ec2LaunchDto {
  
  @ApiProperty({ enum: Ec2LaunchAction })
  action: Ec2LaunchAction;

}