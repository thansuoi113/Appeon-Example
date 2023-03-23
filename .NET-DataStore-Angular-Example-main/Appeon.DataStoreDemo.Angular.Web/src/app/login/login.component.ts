import { MatProgressBar } from '@angular/material/progress-bar';
import { PNotifyService } from './../pnotify.service';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('progressBar') progressBar: MatProgressBar;
  loginUsername = '';
  loginPassword = '';
  loginRemember = false;
  faUser = faUser;
  faLock = faLock;
  buttonEnabled = true;
  querying = false;

  constructor(
    private pNotify: PNotifyService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginUsername = 'Michael.Raheem';
    this.loginPassword = 'K7dMpTY=';
  }

  login(): void {
    this.buttonEnabled = false;
    this.querying = true;
    this.loginService.login(this.loginUsername, this.loginPassword).subscribe({
      next: (loggedin) => {
        this.querying = false;
        this.pNotify
          .getPNotify()
          .success({ text: 'Login Success', title: 'Welcome', icon: '' });
        this.router.navigateByUrl('/');
        this.buttonEnabled = true;
      },
      error: (e) => {
        this.querying = false;
        this.buttonEnabled = true;
        if (e.status == 401) {
          this.pNotify.getPNotify().alert('Wrong Username or Password');
        } else {
          this.pNotify.getPNotify().error('Could not send request');
        }
      },
    });
  }
}
