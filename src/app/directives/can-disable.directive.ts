import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[canDisable]',
  standalone: true,
})
export class CanDisableDirective {
  isDisabled = false;

  @Input()
  @HostBinding('attr.disabled')
  setIsDisabled(value: boolean) {
    this.isDisabled = value;
  }

  get disabled(): boolean {
    return this.isDisabled;
  }

  @HostBinding('attr.disabled')
  protected get isNativeDisabled(): '' | null {
    return this.disabled ? '' : null;
  }

  @HostListener('click', ['$event'])
  @HostListener('dblclick', ['$event'])
  onClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
}
