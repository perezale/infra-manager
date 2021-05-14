import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//AWS
import { AwsSdkModule } from 'nest-aws-sdk';
import { SharedIniFileCredentials } from 'aws-sdk';
import { Ec2Module } from './ec2/ec2.module';
import { KeycloakModule } from './keycloak/keycloak.module';

@Module({
  imports: [
    Ec2Module,
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: 'us-west-2',
        /*credentials: new SharedIniFileCredentials({
          profile: 'default',
        }),*/
      },
    }),
    KeycloakModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
