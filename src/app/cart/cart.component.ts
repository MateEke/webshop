import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from '../common/services/cart.service';
import { CartProductComponent } from './cart-product/cart-product.component';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CartProductComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private readonly cartService = inject(CartService);

  products$ = this.cartService.cartProducts$;
  totalValue$ = this.cartService.cartValue$;
}
