import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  isLoading = false;
  loginSuccess = false;
  successMsg = 'Logged In Successfully!';

  constructor(
    private auth: AuthService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.isLoginDisabled = true;
      const { username, password } = this.loginForm.getRawValue();
      this.auth.login(username!, password!).subscribe({
        next: (loginResponse) => {
          console.log(loginResponse);
          this.loginSuccess = true;
          this.cd.markForCheck();
          setTimeout(() => {
            this.router.navigateByUrl('/users');
          }, 1500);
        },
        error: (e) => console.error(e),
      });
    }
  }
}
