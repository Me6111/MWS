import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetFullDirController } from './GetFullDir.controller';

@Module({
  imports: [],
  controllers: [AppController, GetFullDirController],
  providers: [AppService],
})
export class AppModule {}
