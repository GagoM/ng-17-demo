import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AuthService } from '../../services/auth.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { USER_MOCK } from '../../../mocks/user.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let mockAuthService: jasmine.SpyObj<AuthService>;
  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockAuthService.login.and.returnValue(of(USER_MOCK));
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method when credentials provided', () => {
    const debugEL = fixture.debugElement;
    const usernameInput = debugEL.query(By.css('input[testing-id="username"]'));
    const passwordInput = debugEL.query(By.css('input[testing-id="password"]'));
    usernameInput.nativeElement.value = 'test';
    usernameInput.nativeElement.dispatchEvent(new Event('input'));
    passwordInput.nativeElement.value = 'test';
    passwordInput.nativeElement.dispatchEvent(new Event('input'));
    const submit = debugEL.query(By.css('button[type="submit"]'));
    submit.nativeElement.click();
    fixture.detectChanges();
    expect(mockAuthService.login.calls.any()).toBe(true);
    const loginSuccess = debugEL.query(
      By.css('div[testing-id="login-success"]')
    );
    expect(loginSuccess.nativeElement.innerText).toBe(
      fixture.componentInstance.successMsg
    );
  });
});
