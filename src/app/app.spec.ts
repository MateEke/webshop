import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { App } from './app';
import { HeaderCartComponent } from './header-cart/header-cart.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, MockComponent(HeaderCartComponent)],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
