import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';
import { Product, ProductsService } from '../common/services/products.service';
import { OrderByPipe } from './pipes/order-by-pipe';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  const productsSubject = new BehaviorSubject<Product[]>([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, MockComponent(ProductComponent)],
      declarations: [MockPipe(OrderByPipe, (value) => value)],
      providers: [
        MockProvider(ProductsService, {
          getProducts: () => productsSubject.asObservable(),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial orderBy as "name" and orderByDirection as "asc"', () => {
    expect(component.orderBy()).toBe('name');
    expect(component.orderByDirection()).toBe('asc');
  });

  it('should toggle orderByDirection when the same orderBy is passed', () => {
    component.orderBy.set('name');
    component.orderByDirection.set('asc');
    component.changeOrderBy('name');
    expect(component.orderByDirection()).toBe('desc');
    component.changeOrderBy('name');
    expect(component.orderByDirection()).toBe('asc');
  });

  it('should set orderBy and reset orderByDirection to asc when a new key is passed', () => {
    component.orderBy.set('name');
    component.orderByDirection.set('desc');
    component.changeOrderBy('price');
    expect(component.orderBy()).toBe('price');
    expect(component.orderByDirection()).toBe('asc');
  });

  it('should render products from ProductsService', () => {
    productsSubject.next([{} as Product, {} as Product]);

    fixture.detectChanges();

    const productsElement: HTMLElement = fixture.nativeElement;
    const productElements = productsElement.querySelectorAll('app-product')!;
    const noProductMessage = productsElement.querySelector(
      '[data-testid="no-product-message"]',
    );
    expect(noProductMessage).toBeFalsy();
    expect(productElements.length).toBe(2);
  });

  it('should display message if there are no products', () => {
    productsSubject.next([]);

    fixture.detectChanges();

    const productsElement: HTMLElement = fixture.nativeElement;
    const productElements = productsElement.querySelectorAll('app-product')!;
    const noProductMessage = productsElement.querySelector(
      '[data-testid="no-product-message"]',
    );
    expect(noProductMessage).toBeTruthy();
    expect(productElements.length).toBe(0);
  });
});
