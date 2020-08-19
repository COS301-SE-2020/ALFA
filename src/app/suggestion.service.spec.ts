import { TestBed } from '@angular/core/testing';

import { SuggestionService } from './suggestion.service';
import {MessageService} from './message.service';

describe('SuggestionService', () => {
  let service: SuggestionService;
  let httpClientSpy: {get: jasmine.Spy, post: jasmine.Spy};
  let messageService: MessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    messageService = new MessageService();
    service = new SuggestionService(httpClientSpy as any, new MessageService());
    // service = TestBed.inject(SuggestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should vote and emit message', () => {
      // service.vote(1, 'Test', 1);
      // expect(messageService.notifier.emit).toHaveBeenCalled();
      // expect(messageService.notifier.emit).toHaveBeenCalledWith('');
  });
});
