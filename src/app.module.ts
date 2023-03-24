import { Module } from '@nestjs/common';
import { ContributorModule } from './presentation/modules/contributor.module';

@Module({
  imports: [ContributorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
