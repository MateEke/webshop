import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-image-with-fallback',
  imports: [NgOptimizedImage],
  templateUrl: './image-with-fallback.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageWithFallbackComponent {
  imageUrl = input.required<string>();
  altText = input.required<string>();

  imageError = signal(false);

  computedImageUrl = computed(() => {
    return this.imageError() ? 'no-image.png' : this.imageUrl();
  });

  constructor() {
    effect(() => {
      this.imageError.set(!this.imageUrl());
    });
  }
}
