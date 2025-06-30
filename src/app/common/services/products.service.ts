import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  private products$: Observable<Product[]>;

  constructor() {
    this.products$ = this.http.get<ApiProduct[]>('/products').pipe(
      map((products) => {
        return products.map((product) => {
          const _id =
            product.id + '-' + product.name.toLowerCase().replaceAll(' ', '_');
          return {
            ...product,
            _id,
          };
        });
      }),
      shareReplay(),
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }
}

export interface ApiProduct {
  id: string;
  name: string;
  img: string;
  availableAmount: number;
  minOrderAmount: number;
  price: number;
}

/* id is not unique in the API, so we need to create a unique identifier for each product
by combining the id and name. This is used to identify products in the cart. */
export interface Product extends ApiProduct {
  _id: string;
}
