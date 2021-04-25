import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ProductService);
  });
  
  it('should get the data successfully', (done: DoneFn) => {
    service.getProducts().subscribe((items: Product[]) => {
      console.log('data is ', items);
      expect(items.length).toBeGreaterThan(1);
      done();
    });
  });
});