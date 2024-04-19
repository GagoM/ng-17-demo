import { Component, HostListener } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  constructor(private modalService: ModalService) {}

  @HostListener('document:keydown.esc')
  onEsc() {
    this.modalService.close();
  }

  onWrapperClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
