import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): Object {
    return {
      status: "running"
    };
  }
}
