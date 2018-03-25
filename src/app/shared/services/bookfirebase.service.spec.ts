import { TestBed, inject } from '@angular/core/testing';

import { BookfirebaseService } from './bookfirebase.service';

describe('BookfirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookfirebaseService]
    });
  });

  it('should be created', inject([BookfirebaseService], (service: BookfirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
