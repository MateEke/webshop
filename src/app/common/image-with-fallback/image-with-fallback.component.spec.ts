import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWithFallbackComponent } from './image-with-fallback.component';

describe('ImageWithFallbackComponent', () => {
  let component: ImageWithFallbackComponent;
  let fixture: ComponentFixture<ImageWithFallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageWithFallbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageWithFallbackComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the provided imageUrl initially', () => {
    fixture.componentRef.setInput('imageUrl', 'test.png');
    fixture.componentRef.setInput('altText', 'alt');

    fixture.detectChanges();

    expect(component.computedImageUrl()).toBe('test.png');
    expect(component.imageError()).toBe(false);
  });

  it('should use fallback image if imageError is true', () => {
    fixture.componentRef.setInput('imageUrl', 'test.png');
    fixture.componentRef.setInput('altText', 'alt');

    fixture.detectChanges();

    component.imageError.set(true);
    expect(component.computedImageUrl()).toBe('no-image.png');
  });

  it('should set imageError to true if imageUrl is empty', () => {
    fixture.componentRef.setInput('imageUrl', '');
    fixture.componentRef.setInput('altText', 'alt');

    fixture.detectChanges();

    expect(component.imageError()).toBe(true);
    expect(component.computedImageUrl()).toBe('no-image.png');
  });

  it('should fall back when image element emits an error', () => {
    fixture.componentRef.setInput('imageUrl', 'test.png');
    fixture.componentRef.setInput('altText', 'alt');

    fixture.detectChanges();

    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector('img');

    expect(imgElement.src).toContain('test.png');

    imgElement.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(component.imageError()).toBe(true);
    expect(component.computedImageUrl()).toBe('no-image.png');
    expect(imgElement.src).toContain('no-image.png');
  });
});
