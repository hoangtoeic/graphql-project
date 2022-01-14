import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './main/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
