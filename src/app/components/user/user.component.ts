import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from '../../models/user';
import { AddressPipe } from '../../pipes/address.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'user',
  standalone: true,
  imports: [AddressPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @Input({ required: true })
  user!: User;

  @Output()
  userClicked = new EventEmitter();

  onClick() {
    this.userClicked.emit();
  }
}
