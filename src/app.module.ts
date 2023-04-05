import { Module } from '@nestjs/common';
import { ContributorModule } from './presentation/modules/contributor.module';
import { OccurrenceModule } from './presentation/modules/occurrence.module';

@Module({
  imports: [ContributorModule, OccurrenceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
