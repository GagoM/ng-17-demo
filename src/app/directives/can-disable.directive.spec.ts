import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CanDisableDirective } from './can-disable.directive';

describe('CanDisableDirective', () => {
  it('should create an instance', () => {
    const directive = new CanDisableDirective();
    expect(directive).toBeTruthy();
  });

  it('should return correct state of isDisabled', () => {
    const { fixture, debugEL } = setup();
    const div = debugEL.query(By.directive(CanDisableDirective));
    expect(div.attributes['disabled']).not.toBeNull();
    fixture.componentInstance.isDisabled = false;
    fixture.detectChanges();
    expect(div.attributes['disabled']).toBe('');
  });

  it('should prevent click when isDisabled', () => {
    const { debugEL } = setup();
    const div = debugEL.query(By.directive(CanDisableDirective));
    const clickEvent = new PointerEvent('click', {
      cancelable: true,
    });
    div.triggerEventHandler('click', clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);
  });
});

const setup = () => {
  @Component({
    standalone: true,
    imports: [CanDisableDirective],
    template: ` <div canDisable [disabled]="true"></div> `,
  })
  class CanDisableDirectiveHost {
    isDisabled = true;
  }
  const fixture = TestBed.createComponent(CanDisableDirectiveHost);
  const debugEL = fixture.debugElement;
  fixture.detectChanges();
  return { fixture, debugEL };
};
