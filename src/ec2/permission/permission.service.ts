import { Injectable, Logger } from '@nestjs/common';
import UserPermission from './entity/user-permission.entity';

@Injectable()
export class PermissionService {

  private readonly logger = new Logger(PermissionService.name);

  getByUser(email:string): UserPermission {
    return this.buildPermissions().find(item => item.user == email);
  }

  buildPermissions(): UserPermission[] {
    let data = [
      {
        email: 'perezalejandrojulian@gmail.com',
        instances: [
          'i-0af38a90d551a2aac',
          'i-0060e2245a458a133',
          /*'i-00e8167eec9e634b7',
          'i-09613932aa49e1511',
          'i-0dc84ad76e52956fe',
          'i-054c4187faef8783a',
          'i-02e9ef68fbc53f9c0',
          'i-0367eaeb67ed18507',
          'i-0efb208b429dd22e1',
          'i-021787da9239e656d',
          'i-078c324d6196ebdfa',
          'i-050dde3515fd86aca',
          'i-007ad7d7d32b2a468',
          'i-0e9368b8303d28995',
          'i-0ec3103cb31338793',
          'i-0cd73ecbf7e600d8d',
          'i-0c887aced9a6ed166',
          'i-0fa2a18b934499edc',*/
        ]
      }
    ];
    return data.map(user => {
      return {
        user: user.email,
        instances: user.instances,
      } as UserPermission;
    })
  }
}
