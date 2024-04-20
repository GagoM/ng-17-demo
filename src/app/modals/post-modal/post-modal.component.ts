import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { MODAL_DATA } from '../../helpers/constants';
import { Post } from '../../models/post';

@Component({
  selector: 'post-modal',
  standalone: true,
  imports: [],
  templateUrl: './post-modal.component.html',
  styleUrl: './post-modal.component.scss',
})
export class PostModalComponent {
  constructor(@Inject(MODAL_DATA) protected data: { post: Post }) {}
}
