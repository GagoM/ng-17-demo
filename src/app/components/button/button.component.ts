import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CanDisableDirective } from '../../directives/can-disable.directive';

@Component({
  selector: 'button[cButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  hostDirectives: [{ directive: CanDisableDirective, inputs: ['disabled'] }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  isLoading = false;
}
