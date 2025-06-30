import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageWithFallbackComponent } from '../../common/image-with-fallback/image-with-fallback.component';
import { CartService } from '../../common/services/cart.service';
import { Product } from '../../common/services/products.service';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, ImageWithFallbackComponent, FormsModule],
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  private readonly cartService = inject(CartService);

  product = input.required<Product>();

  inputValue = signal(0);
  cartAmount = signal(0);

  computedStock = computed(() => {
    return this.product().availableAmount - this.cartAmount();
  });

  constructor() {
    effect(() => {
      this.cartAmount.set(this.cartService.amountInCart(this.product()._id));
    });
    effect(() => {
      if (this.cartAmount() > 0) {
        this.inputValue.set(this.cartAmount());
      }
    });
  }

  updateCart() {
    if (
      !this.inputValue() ||
      this.inputValue() < this.product().minOrderAmount ||
      this.inputValue() > this.product().availableAmount
    ) {
      this.cartService.deleteFromCart(this.product()._id);
      this.cartAmount.set(0);
    } else {
      this.cartService.addToCart(this.product()._id, this.inputValue());
      this.cartAmount.set(this.inputValue());
    }
  }
}
