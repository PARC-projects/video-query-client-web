import { NgModule } from '@angular/core';
import { SearchSetRepository } from './search-set.repository';
import { QueryRepository } from './query.repository';
import { QueryResultRepository } from './query-result.repository';
import { SignatureRepository } from './signature.repository';
import { VideoRepository } from './video.repository';
import { UserRepository } from './user.repository';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { MatchRepository } from './match.repository';
import { ProfileRepository } from './profile.repository';

@NgModule({
  providers: [
    SearchSetRepository,
    QueryRepository,
    QueryResultRepository,
    MatchRepository,
    SignatureRepository,
    VideoRepository,
    UserRepository,
    ProfileRepository,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class RepositoryModule { }
