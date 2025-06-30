import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { CartService } from './cart.service';
import { ProductsService } from './products.service';

describe('CartService', () => {
  let service: CartService;
  const mockProducts = [
    {
      id: '1',
      name: 'Apple',
      img: '',
      availableAmount: 10,
      minOrderAmount: 1,
      price: 2,
      _id: '1-apple',
    },
    {
      id: '2',
      name: 'Banana',
      img: '',
      availableAmount: 5,
      minOrderAmount: 1,
      price: 1,
      _id: '2-banana',
    },
  ];
  let setItemSpy: jasmine.Spy;

  describe('With localStorage', () => {
    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.returnValue(
        '[{"_id":"1-apple","amount":2}]',
      );
      setItemSpy = spyOn(localStorage, 'setItem');
      TestBed.configureTestingModule({
        providers: [
          CartService,
          MockProvider(ProductsService, {
            getProducts: () => of(mockProducts),
          }),
        ],
      });
      service = TestBed.inject(CartService);
    });

    it('should initialize cart from localStorage', () => {
      expect(service.amountInCart('1-apple')).toBe(2);
      service.cartValue$.subscribe((val) => expect(val).toBe(4));
    });
  });

  describe('Without localStorage', () => {
    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      setItemSpy = spyOn(localStorage, 'setItem');
      TestBed.configureTestingModule({
        providers: [
          CartService,
          MockProvider(ProductsService, {
            getProducts: () => of(mockProducts),
          }),
        ],
      });
      service = TestBed.inject(CartService);
    });

    it('should initialize with empty cart', () => {
      expect(service.amountInCart('1-apple')).toBe(0);
      service.cartValue$.subscribe((val) => expect(val).toBe(0));
    });

    it('should add to cart and update value/products', () => {
      service.addToCart('1-apple', 3);

      expect(service.amountInCart('1-apple')).toBe(3);

      service.cartValue$.subscribe((val) => expect(val).toBe(6));

      service.cartProducts$.subscribe((products) => {
        expect(products.length).toBe(1);
        expect(products[0].cartAmount).toBe(3);
        expect(products[0].totalPrice).toBe(6);
      });

      expect(setItemSpy).toHaveBeenCalled();
    });

    it('should update amount if product already in cart', () => {
      service.addToCart('1-apple', 2);
      service.addToCart('1-apple', 5);

      expect(service.amountInCart('1-apple')).toBe(5);

      service.cartValue$.subscribe((val) => expect(val).toBe(10));
    });

    it('should delete from cart', () => {
      service.addToCart('1-apple', 2);

      expect(service.amountInCart('1-apple')).toBe(2);

      service.deleteFromCart('1-apple');

      expect(service.amountInCart('1-apple')).toBe(0);

      service.cartValue$.subscribe((val) => expect(val).toBe(0));
      service.cartProducts$.subscribe((products) =>
        expect(products.length).toBe(0),
      );
      expect(setItemSpy).toHaveBeenCalled();
    });

    it('should handle nonexistent products', () => {
      service.addToCart('1-random', 2);

      expect(service.amountInCart('1-random')).toBe(2);

      service.cartValue$.subscribe((val) => expect(val).toBe(0));
      service.cartProducts$.subscribe((products) =>
        expect(products.length).toBe(0),
      );
      expect(setItemSpy).toHaveBeenCalled();
    });
  });
});
