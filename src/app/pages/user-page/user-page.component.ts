import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserComponent } from '../../components/user/user.component';
import { GMapComponent } from '../../components/g-map/g-map.component';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'user-page',
  standalone: true,
  imports: [UserComponent, GMapComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent implements OnInit {
  user: User;
  posts!: Observable<Post[]>;

  constructor(private router: Router, private postsService: PostsService) {
    this.user = this.router.getCurrentNavigation()?.extras.state as User;
  }

  ngOnInit(): void {
    this.postsService.fetchPosts(1);
  }
}
