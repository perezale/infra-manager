import { Injectable, Logger } from '@nestjs/common';
import { EC2 } from 'aws-sdk';
import { InstanceState, Instance } from 'aws-sdk/clients/ec2';
import { InjectAwsService } from 'nest-aws-sdk';
import { InstanceDetailDto } from './dto/InstanceDetailDto';

@Injectable()
export class StatusService {

    private readonly logger = new Logger(StatusService.name);

    constructor (
        @InjectAwsService(EC2) private readonly ec2: EC2,
    ) {}

    async getAll() : Promise<InstanceDetailDto[]> {
        const response = await this.ec2.describeInstances().promise();

        if (response.$response.error) {
            this.logger.error(response.$response.error)
            return;
        }

        let instances = response.Reservations.map( 
            reservations => reservations.Instances
                .map(i => {
                    return {
                        instanceId: i.InstanceId,
                        instanceType: i.InstanceType,
                        status: i.State,
                        name: i.Tags.find(tag => tag.Key.toLowerCase() == "name").Value,
                        publicIp: i.PublicIpAddress,
                        keyName: i.KeyName,

                    } as InstanceDetailDto
                } )
                .reduce(instance => instance));
        
        return instances;
    }

    async getStatus(instanceId: string) : Promise<InstanceState> {

        const response = await this.ec2.describeInstances({
            InstanceIds: [instanceId]
        }).promise();

        if (response.$response.error) {
            this.logger.error(response.$response.error)
            return;
        }

        let instance = response.Reservations.map( 
            reservations => reservations.Instances.find(list => list.InstanceId == instanceId)
        ).reduce(instance => instance);
        
        return instance.State;
    }

}
