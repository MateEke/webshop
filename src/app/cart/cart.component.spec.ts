import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { BehaviorSubject, of } from 'rxjs';
import { CartProduct, CartService } from '../common/services/cart.service';
import { CartProductComponent } from './cart-product/cart-product.component';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  const cartProductsSubject = new BehaviorSubject<CartProduct[]>([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent, MockComponent(CartProductComponent)],
      providers: [
        MockProvider(CartService, {
          cartProducts$: cartProductsSubject.asObservable(),
          cartValue$: of(42),
        } as CartService),
      ],
      declarations: [CurrencyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cart products', () => {
    cartProductsSubject.next([{} as CartProduct, {} as CartProduct]);

    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;
    const productElements = nativeElement.querySelectorAll('app-cart-product');
    const emptyCartMessage = nativeElement.querySelector(
      '[data-testid="empty-cart-message"]',
    );

    expect(productElements.length).toBe(2);
    expect(emptyCartMessage).toBeFalsy();
  });

  it('should display empty cart message if there are no products', () => {
    cartProductsSubject.next([]);

    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;
    const productElements = nativeElement.querySelectorAll('app-cart-product');
    const emptyCartMessage = nativeElement.querySelector(
      '[data-testid="empty-cart-message"]',
    );

    expect(emptyCartMessage).toBeTruthy();
    expect(productElements.length).toBe(0);
  });

  it('should display the total value', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const totalValueElement = nativeElement.querySelector(
      '[data-testid="cart-total-value"]',
    );

    expect(totalValueElement?.textContent).toContain('42');
  });
});
