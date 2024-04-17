import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserComponent } from '../../components/user/user.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'users',
  standalone: true,
  imports: [AsyncPipe, UserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  users!: Observable<User[]>;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  onUserClicked(user: User) {
    this.router.navigateByUrl('/user', {
      state: user,
    });
  }
}
