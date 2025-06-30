import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Product, ProductsService } from '../common/services/products.service';
import { OrderByPipe } from './pipes/order-by-pipe';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, OrderByPipe, ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  private productsService = inject(ProductsService);

  products$ = this.productsService.getProducts();
  orderBy = signal<keyof Product>('name');
  orderByDirection = signal<'asc' | 'desc'>('asc');

  changeOrderBy(orderBy: keyof Product) {
    if (this.orderBy() === orderBy) {
      const reversedOrderBy =
        this.orderByDirection() === 'asc' ? 'desc' : 'asc';
      this.orderByDirection.set(reversedOrderBy);
    } else {
      this.orderBy.set(orderBy);
      this.orderByDirection.set('asc');
    }
  }
}
