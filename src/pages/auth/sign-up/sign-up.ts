import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { LoginEmailPage } from '../login-email/login-email';
import { AuthProvider } from '../../../providers/auth';

import { TaskPage } from '../../task/task';

@Component({
  templateUrl: 'sign-up.html',
  selector: 'sign-up',
})

export class SignUpPage {
  form: any;

  constructor(private navCtrl: NavController,
    private auth: AuthProvider,
    private loadingCtrl: LoadingController,
     public alertCtrl: AlertController
  ) {
    this.form = {
      username: '',
      email: '',
      password: ''
    }
  }

  openLoginPage(): void {
    this.navCtrl.push(LoginEmailPage);
  }

  register() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.registerUser(this.form).subscribe(registerData => {
      this.auth.loginWithEmail(registerData).subscribe(loginData => {
        setTimeout(() => {
          loading.dismiss();
          this.navCtrl.setRoot(TaskPage);
        }, 1000);
      }, loginError => {
        setTimeout(() => {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            subTitle: loginError,
            buttons: ['OK']
          });
          alert.present();
        }, 1000);
      });
    }, registerError => {
      setTimeout(() => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
            subTitle: registerError,
            buttons: ['OK']
          });
          alert.present();
      }, 1000);
    });
  }
}
