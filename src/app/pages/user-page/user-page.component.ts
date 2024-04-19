import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GMapComponent } from '../../components/g-map/g-map.component';
import { PostComponent } from '../../components/post/post.component';
import { UserComponent } from '../../components/user/user.component';
import { PostModalComponent } from '../../modals/post-modal/post-modal.component';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostsService } from '../../services/posts.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'user-page',
  standalone: true,
  imports: [
    UserComponent,
    GMapComponent,
    AsyncPipe,
    PostComponent,
    PostModalComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent implements OnInit {
  user: User;
  posts$!: Observable<Post[]>;
  isLoading = true;
  selectedPost = new BehaviorSubject<Post | null>(null);

  constructor(
    private router: Router,
    private postsService: PostsService,
    private modalService: ModalService
  ) {
    this.user = this.router.getCurrentNavigation()?.extras.state as User;
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.fetchPosts(this.user.id);
  }

  onPostClick(post: Post) {
    console.log('asd')
    this.modalService.open(PostModalComponent, {
      post,
    });
  }
}
