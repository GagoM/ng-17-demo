import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { Component, Inject, inject } from '@angular/core';
import { MODAL_DATA } from '../helpers/constants';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
    service.close();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const txt = 'this is a test component.';
  @Component({
    standalone: true,
    template: `<div test-id="modal-test-component">${txt}</div>`,
  })
  class TestModalComponent {
    public data: { test: string } = inject(MODAL_DATA);
  }

  it('should present the component content', () => {
    service.open(TestModalComponent);
    const element = document.querySelector(
      'div[test-id="modal-test-component"]'
    );
    expect(element).not.toBeNull();
    expect(element?.innerHTML).toBe(txt);
  });

  it('the opened component should be destroyed after close', fakeAsync(() => {
    service.open(TestModalComponent);
    service.close();
    tick(190);
    const element = document.querySelector(
      'div[test-id="modal-test-component"]'
    );
    expect(element).toBeNull();
  }));

  it('should inject the proper data when provided', () => {
    const testData = {
      test: 'abc',
    };
    const component = service.open(TestModalComponent, testData);
    expect(component.instance.data.test).toBe(testData.test);
  });

  it('should remove the modal on ESC press', fakeAsync(() => {
    const component = service.open(TestModalComponent);
    let element = document.querySelector('div[test-id="modal-test-component"]');
    expect(element).not.toBeNull();
    const event = new KeyboardEvent('keydown', {
      key: 'esc',
    });
    document.dispatchEvent(event);
    service.modalComponent?.instance.onEsc();
    tick(190);
    element = document.querySelector('div[test-id="modal-test-component"]');
    expect(element).toBeNull();
  }));
  it('should remove the modal on overlay press', fakeAsync(() => {
    const component = service.open(TestModalComponent);
    let element = document.querySelector('div[test-id="modal-test-component"]');
    expect(element).not.toBeNull();
    service.modalComponent?.instance.onWrapperClick(new PointerEvent('click'));
    tick(190);
    element = document.querySelector('div[test-id="modal-test-component"]');
    expect(element).not.toBeNull();
  }));
});
