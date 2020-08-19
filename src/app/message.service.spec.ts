import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let httpClientSpy: {get : jasmine.Spy};
  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new MessageService();
  });

  it('should nofify with any given message', () => {
    spyOn(service.notifier, 'emit');
    service.notify('Sample Message');
    expect(service.notifier.emit).toHaveBeenCalled();
    expect(service.notifier.emit).toHaveBeenCalledWith('Sample Message');
  });
});
