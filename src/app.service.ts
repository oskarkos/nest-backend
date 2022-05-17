import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private readonly tasks: any[],
    private configService: ConfigService,
  ) {}

  getHello(): string {
    const apiKey = this.configService.get<string>('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    return `Hello World!! ${apiKey} ${dbName}`;
  }
}
