import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderCartComponent } from './header-cart/header-cart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HeaderCartComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
