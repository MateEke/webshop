import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error.component',
  imports: [RouterLink],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {}
