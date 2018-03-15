import { TestBed, inject } from '@angular/core/testing';

import { BookServiceService } from './book.service';

describe('BookServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookServiceService]
    });
  });

  it('should be created', inject([BookServiceService], (service: BookServiceService) => {
    expect(service).toBeTruthy();
  }));
});
