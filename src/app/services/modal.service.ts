import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  Type,
  createComponent,
} from '@angular/core';
import { ModalComponent } from '../modals/modal/modal.component';
import { MODAL_DATA } from '../helpers/constants';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalComponent!: ComponentRef<ModalComponent>;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open<C>(component: Type<C>, data: any = {}) {
    const elementInjector: Injector = Injector.create({
      providers: [
        {
          provide: MODAL_DATA,
          useValue: data,
        },
      ],
      parent: this.injector,
    });

    const newComponent = createComponent(component, {
      elementInjector,
      environmentInjector: this.injector,
    });

    this.modalComponent = createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });

    document.body.appendChild(this.modalComponent.location.nativeElement);
    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.modalComponent.hostView);
  }

  close() {
    this.modalComponent.location.nativeElement.style.animation = 'fade-out .2s'
    setTimeout(() => {
      this.modalComponent.destroy();
    }, 190);
  }
}
