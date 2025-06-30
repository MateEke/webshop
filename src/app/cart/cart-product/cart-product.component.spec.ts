import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { ImageWithFallbackComponent } from '../../common/image-with-fallback/image-with-fallback.component';
import { CartProduct, CartService } from '../../common/services/cart.service';
import { CartProductComponent } from './cart-product.component';

describe('CartProductComponent', () => {
  let component: CartProductComponent;
  let fixture: ComponentFixture<CartProductComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  const mockProduct: CartProduct = {
    _id: '1-apple',
    id: '1',
    name: 'Apple',
    img: '',
    availableAmount: 10,
    minOrderAmount: 1,
    price: 2,
    cartAmount: 2,
    totalPrice: 4,
  };

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartService', ['deleteFromCart']);
    await TestBed.configureTestingModule({
      imports: [
        CartProductComponent,
        MockComponent(ImageWithFallbackComponent),
      ],
      providers: [MockProvider(CartService, cartServiceSpy)],
    }).compileComponents();

    fixture = TestBed.createComponent(CartProductComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteFromCart with product _id', () => {
    component.deleteFromCart();
    expect(cartServiceSpy.deleteFromCart).toHaveBeenCalledWith('1-apple');
  });
});
