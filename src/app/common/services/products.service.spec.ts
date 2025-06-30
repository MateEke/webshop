import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ApiProduct, ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  const apiProducts: ApiProduct[] = [
    {
      id: '1',
      name: 'Apple',
      img: '',
      availableAmount: 10,
      minOrderAmount: 1,
      price: 2,
    },
    {
      id: '2',
      name: 'Banana',
      img: '',
      availableAmount: 5,
      minOrderAmount: 1,
      price: 1,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products with _id', (done) => {
    const httpTesting = TestBed.inject(HttpTestingController);

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products[0]._id).toBe('1-apple');
      expect(products[1]._id).toBe('2-banana');
      expect(products[0].name).toBe('Apple');
      done();
    });

    const req = httpTesting.expectOne('/products');

    req.flush(apiProducts);

    httpTesting.verify();
  });

  it('should share the observable (single HTTP call for multiple subscribers)', (done) => {
    const obs1 = service.getProducts();
    const obs2 = service.getProducts();

    obs1.subscribe((products) => {
      expect(products.length).toBe(2);
    });
    obs2.subscribe((products) => {
      expect(products.length).toBe(2);
      done();
    });

    const httpTesting = TestBed.inject(HttpTestingController);

    const req = httpTesting.expectOne('/products');

    req.flush(apiProducts);

    httpTesting.verify();
  });
});
