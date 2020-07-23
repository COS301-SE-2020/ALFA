import { TestBed } from '@angular/core/testing';

import { ArticleServiceService } from './article-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('ArticleServiceService', () => {
  let service: ArticleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]

    });
    service = TestBed.inject(ArticleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
