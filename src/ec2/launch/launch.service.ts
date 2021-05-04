import { Injectable, Logger } from '@nestjs/common';
import { EC2 } from 'aws-sdk';
import { InstanceStateChange } from 'aws-sdk/clients/ec2';
import { InjectAwsService } from 'nest-aws-sdk';

@Injectable()
export class LaunchService {
  
  private readonly logger = new Logger(LaunchService.name);

  constructor (
    @InjectAwsService(EC2) private readonly ec2: EC2,
  ) {}


  async start(instanceId: string) : Promise<InstanceStateChange> {
    const response = await this.ec2.startInstances({
        InstanceIds: [instanceId]
    }).promise();
    return response.StartingInstances.reduce(instance => instance);
  }

  async stop(instanceId: string) : Promise<InstanceStateChange> {
    const response = await this.ec2.stopInstances({
      InstanceIds: [instanceId]
    }).promise();
    return response.StoppingInstances.reduce(instance => instance);
    
  }


    
}
