import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Article } from '../article'
import { ArticleServiceService } from '../article-service.service';
describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  const article: Article = {
    kb_index: 1,
    description: 'Test Description',
    link: 'https://test.com',
    web_link: 'https://test.com'
  };
  const mockArticle = {
    getContent: () => of(article)
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleComponent],
      imports: [HttpClientModule],
      providers: [{ provide: ArticleServiceService, useValue: mockArticle }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(mockArticle, 'getContent').and.returnValue(of(article));
    expect(mockArticle.getContent).toHaveBeenCalled();
  });

  it('should create', fakeAsync(() => {
    // spyOn(mockArticle, 'getContent').and.returnValue(of(article));
    // expect(mockArticle.getContent).toHaveBeenCalled();

    tick(3000);
    expect(component).toBeTruthy();
  }));
});
