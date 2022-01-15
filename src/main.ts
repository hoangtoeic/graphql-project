import { NestFactory } from '@nestjs/core';
import { ConnectionManager, createConnection } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const connectionManager = new ConnectionManager();
  try {
    createConnection()
  } catch (error) {
    
  }
  await app.listen(3000);
}
bootstrap();
