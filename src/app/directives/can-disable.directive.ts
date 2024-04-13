import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[canDisable]',
  standalone: true,
})
export class CanDisableDirective {
  _isDisabled = false;

  @Input()
  @HostBinding('attr.disabled')
  set disabled(value: boolean) {
    this._isDisabled = value;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  @HostBinding('attr.disabled')
  protected get isNativeDisabled(): '' | null {
    return this._isDisabled ? '' : null;
  }

  @HostListener('click', ['$event'])
  @HostListener('dblclick', ['$event'])
  onClick(e: Event) {
    if (this._isDisabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
}
