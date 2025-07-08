import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { MockComponent, MockProvider } from 'ng-mocks';
import { ImageWithFallbackComponent } from '../../common/image-with-fallback/image-with-fallback.component';
import { CartService } from '../../common/services/cart.service';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  const mockProduct = {
    _id: '1',
    availableAmount: 10,
    minOrderAmount: 2,
    name: 'Test',
    img: '',
    price: 5,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent, MockComponent(ImageWithFallbackComponent)],
      providers: [MockProvider(CartService)],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should initialize inputValue and cartAmount from cartService', fakeAsync(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    const cartService = TestBed.inject(CartService);
    spyOn(cartService, 'amountInCart').and.returnValue(3);

    fixture.componentRef.setInput('product', mockProduct);

    fixture.detectChanges();
    tick(510);
    fixture.detectChanges();

    expect(component.inputValue()).toBe(3);
    expect(component.cartAmount()).toBe(3);
  }));

  it('should compute stock correctly', () => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', mockProduct);
    component.cartAmount.set(4);

    expect(component.computedStock()).toBe(6);
  });

  it('should add to cart and update cartAmount with valid input', fakeAsync(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    const cartService = TestBed.inject(CartService);
    spyOn(cartService, 'addToCart');

    fixture.componentRef.setInput('product', mockProduct);
    component.inputControl.setValue(5);
    tick(510);
    fixture.detectChanges();

    expect(cartService.addToCart).toHaveBeenCalledWith('1', 5);
    expect(component.cartAmount()).toBe(5);
  }));

  it('should delete from cart and reset cartAmount if input is invalid (too low)', fakeAsync(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    const cartService = TestBed.inject(CartService);
    spyOn(cartService, 'deleteFromCart');

    fixture.componentRef.setInput('product', mockProduct);

    component.inputControl.setValue(1);
    tick(510);
    fixture.detectChanges();

    expect(cartService.deleteFromCart).toHaveBeenCalledWith('1');
    expect(component.cartAmount()).toBe(0);
  }));

  it('should delete from cart and reset cartAmount if input is invalid (too high)', fakeAsync(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    const cartService = TestBed.inject(CartService);
    spyOn(cartService, 'deleteFromCart');

    fixture.componentRef.setInput('product', mockProduct);

    component.inputControl.setValue(20);
    tick(510);
    fixture.detectChanges();

    expect(cartService.deleteFromCart).toHaveBeenCalledWith('1');
    expect(component.cartAmount()).toBe(0);
  }));
});
