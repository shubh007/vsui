import { TestBed } from '@angular/core/testing';

import { VsDataSharingService } from './vs-data-sharing.service';

describe('VsDataSharingService', () => {
  let service: VsDataSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VsDataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
