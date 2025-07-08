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
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ImageWithFallbackComponent } from '../../common/image-with-fallback/image-with-fallback.component';
import { CartService } from '../../common/services/cart.service';
import { Product } from '../../common/services/products.service';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, ImageWithFallbackComponent, ReactiveFormsModule],
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  private readonly cartService = inject(CartService);

  product = input.required<Product>();
  inputControl = new FormControl(0);

  inputValue = toSignal(
    this.inputControl.valueChanges.pipe(debounceTime(500)),
    { initialValue: 0 },
  );
  cartAmount = signal(0);

  computedStock = computed(() => {
    return this.product().availableAmount - this.cartAmount();
  });

  constructor() {
    effect(() => {
      if (this.product()) {
        this.inputControl.clearValidators();
        this.inputControl.addValidators([
          Validators.min(this.product().minOrderAmount),
          Validators.max(this.product().availableAmount),
        ]);
        this.inputControl.updateValueAndValidity();
        this.cartAmount.set(this.cartService.amountInCart(this.product()._id));
      }
    });
    effect(() => {
      if (this.cartAmount() > 0) {
        this.inputControl.setValue(this.cartAmount());
      }
    });
    effect(() => {
      this.updateCart(this.inputValue() ?? 0);
    });
  }

  updateCart(value: number) {
    if (
      !value ||
      value < this.product().minOrderAmount ||
      value > this.product().availableAmount
    ) {
      this.cartService.deleteFromCart(this.product()._id);
      this.cartAmount.set(0);
    } else {
      this.cartService.addToCart(this.product()._id, value);
      this.cartAmount.set(value);
    }
  }
}
