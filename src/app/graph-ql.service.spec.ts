import { TestBed } from '@angular/core/testing';

import { GraphQLService } from './graph-ql.service';

describe('GraphQLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphQLService = TestBed.get(GraphQLService);
    expect(service).toBeTruthy();
  });
});
