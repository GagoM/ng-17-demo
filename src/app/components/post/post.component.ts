import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../models/post';

@Component({
  selector: 'post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {

  @Input({required: true})
  post!: Post;
}
