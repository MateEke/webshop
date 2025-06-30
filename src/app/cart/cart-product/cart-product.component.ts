import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ImageWithFallbackComponent } from '../../common/image-with-fallback/image-with-fallback.component';
import { CartProduct, CartService } from '../../common/services/cart.service';

@Component({
  selector: 'app-cart-product',
  imports: [ImageWithFallbackComponent, CurrencyPipe],
  templateUrl: './cart-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductComponent {
  private readonly cartService = inject(CartService);
  product = input.required<CartProduct>();

  deleteFromCart() {
    this.cartService.deleteFromCart(this.product()._id);
  }
}
