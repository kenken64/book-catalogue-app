import { TestBed, inject } from '@angular/core/testing';

import { FileuploadService } from './fileupload.service';

describe('FileuploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileuploadService]
    });
  });

  it('should be created', inject([FileuploadService], (service: FileuploadService) => {
    expect(service).toBeTruthy();
  }));
});
