import { TestBed } from '@angular/core/testing';

import { ArticleServiceService } from './article-service.service';
import { HttpClientModule } from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';

describe('ArticleServiceService', () => {
  let service: ArticleServiceService;
  let httpClientSpy: {get: jasmine.Spy, post: jasmine.Spy};
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new ArticleServiceService(httpClientSpy as any, new MessageService());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get all articles', () => {
    httpClientSpy.get.and.returnValue(of(['df']));
    console.log = jasmine.createSpy('log');
    service.getArticles().subscribe( (data) => expect(data.length).toBeGreaterThan(0));
    expect(console.log).toHaveBeenCalledWith('Fetched articles');
  });
  it('should post articles', () => {
    httpClientSpy.post.and.returnValue(of([]));
    service.postArticles('test_link', 'test_descr').subscribe(
        data => expect(data).toEqual([])
    );
  });
});
