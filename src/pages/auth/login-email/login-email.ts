import { NavController, LoadingController, AlertController} from 'ionic-angular';
import { Component } from '@angular/core';
import { SignUpPage } from '../sign-up/sign-up';
import { TaskPage } from '../../task/task';
import { AuthProvider } from '../../../providers/auth';

@Component({
  templateUrl: 'login-email.html',
  selector: 'login-email',
})

export class LoginEmailPage {
  form: any;

  constructor(private navCtrl: NavController, private auth: AuthProvider, private loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.form = {
      email: '',
      password: ''
    }
  }

  openSignUpPage(): void {
    this.navCtrl.push(SignUpPage);
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.auth.loginWithEmail(this.form).subscribe(data => {
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.setRoot(TaskPage);
      }, 1000);
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
            subTitle: err,
            buttons: ['OK']
        });
        alert.present();
      }, 1000);
    });
  }
}
