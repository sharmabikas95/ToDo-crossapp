import { Component, ViewChild} from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TaskPage } from '../pages/task/task';
import { LoginEmailPage } from '../pages/auth/login-email/login-email';

import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isAppInitialized: boolean = false;
  user: any;
  rootPage: any = LoginEmailPage;
  
  constructor(
    private platform: Platform,
    protected data: DataProvider,
    protected auth: AuthProvider) {
    this.user = {
      name: ''
    };
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.auth.getUserData().subscribe(data => {
        if (!this.isAppInitialized) {
          this.nav.setRoot(TaskPage);
          this.isAppInitialized = true;
        }
        this.user = data;
        this.data.list('pets').subscribe(data => {
          // console.log(data);
        });
      }, err => {
        this.nav.setRoot(LoginEmailPage);
      });
      StatusBar.styleDefault();
    });
  }
}
