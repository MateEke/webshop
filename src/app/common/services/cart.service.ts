import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Product,
  ProductsService,
} from '../../common/services/products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly productsService = inject(ProductsService);

  private cart: CartItem[] = [];
  private products: Product[] = [];

  cartValue$ = new BehaviorSubject<number>(0);
  cartProducts$ = new BehaviorSubject<CartProduct[]>([]);

  constructor() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      this.initializeCart();
    });
  }

  addToCart(productId: string, amount: number) {
    const existingItem = this.cart.find((item) => item._id === productId);
    if (existingItem) {
      existingItem.amount = amount;
    } else {
      this.cart.push({ _id: productId, amount });
    }
    this.updateCartValue();
    this.updateCartProducts();
    this.saveCart();
  }

  deleteFromCart(productId: string) {
    this.cart = this.cart.filter((item) => item._id !== productId);
    this.updateCartValue();
    this.updateCartProducts();
    this.saveCart();
  }

  amountInCart(productId: string): number {
    const item = this.cart.find((item) => item._id === productId);
    return item ? item.amount : 0;
  }

  private updateCartValue() {
    const totalValue = this.cart.reduce((acc, item) => {
      const product = this.products.find((p) => p._id === item._id);
      if (product) {
        return acc + product.price * item.amount;
      }
      return acc;
    }, 0);
    this.cartValue$.next(totalValue);
  }

  private updateCartProducts() {
    const cartProducts: CartProduct[] = this.cart
      .map((item) => {
        const product = this.products.find((p) => p._id === item._id);
        if (product) {
          return {
            ...product,
            cartAmount: item.amount,
            totalPrice: product.price * item.amount,
          };
        }
        return null;
      })
      .filter((p) => p !== null);
    this.cartProducts$.next(cartProducts);
  }

  private initializeCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    } else {
      this.cart = [];
    }
    this.updateCartValue();
    this.updateCartProducts();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}

export interface CartItem {
  _id: string;
  amount: number;
}

export interface CartProduct extends Product {
  cartAmount: number;
  totalPrice: number;
}
