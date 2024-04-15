import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserComponent } from '../../components/user/user.component';
import { GMapComponent } from '../../components/g-map/g-map.component';

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

  constructor(private router: Router) {
    this.user = this.router.getCurrentNavigation()?.extras.state as User;
  }

  ngOnInit(): void {}
}
