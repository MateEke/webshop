import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../common/services/cart.service';

@Component({
  selector: 'app-header-cart',
  imports: [RouterLink, CurrencyPipe, AsyncPipe],
  templateUrl: './header-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderCartComponent {
  private readonly cartService = inject(CartService);

  cartValue$ = this.cartService.cartValue$;
}
