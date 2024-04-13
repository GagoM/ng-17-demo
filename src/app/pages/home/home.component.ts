import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, ReactiveFormsModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  loginForm = new FormBuilder().group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  isLoginDisabled = false;

  isLoading: boolean = false;

  constructor(private auth: AuthService) {}

  onLogin(): void {
    this.isLoading = true;
    this.isLoginDisabled = true;
    const { username, password } = this.loginForm.getRawValue();
    this.auth
      .login(username!, password!)
      .subscribe({
        next: (loginResponse) => console.log(loginResponse),
        error: (e) => console.error(e),
      });
  }
}
