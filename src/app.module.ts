import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { firstValueFrom } from 'rxjs';

const API_KEY = '123435436';
const API_KEY_PROD = 'PRODkjashdk2342';
@Module({
  imports: [UsersModule, ProductsModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http.get(
          'http://jsonplaceholder.typicode.com/todos',
        );
        const value = Promise.resolve(firstValueFrom(tasks));
        return value;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
