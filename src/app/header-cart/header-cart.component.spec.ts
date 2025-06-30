import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { CartService } from '../common/services/cart.service';
import { HeaderCartComponent } from './header-cart.component';

describe('HeaderCart', () => {
  let component: HeaderCartComponent;
  let fixture: ComponentFixture<HeaderCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCartComponent],
      providers: [
        MockProvider(CartService, { cartValue$: of(10) } as CartService),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cartAmount from cartService', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const cartAmountElement = nativeElement.querySelector(
      '[data-testid="header-cart-value"]',
    );
    expect(cartAmountElement?.textContent).toContain(10);
  });
});
