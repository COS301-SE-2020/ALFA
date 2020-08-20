import { TestBed } from '@angular/core/testing';

import { UploadServiceService } from './upload-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('UploadServiceService', () => {
  let service: UploadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],


    });
    service = TestBed.inject(UploadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
