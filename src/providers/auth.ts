import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFire, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

// Providers
import {DataProvider} from './data';

@Injectable()
export class AuthProvider {
  user: any;
  constructor(private af: AngularFire, private data: DataProvider, private platform: Platform) {
    
  }

  getUserData() {
    return Observable.create(observer => {
      this.af.auth.subscribe(authData => {
        if (authData) {
          this.data.object('users/' + authData.uid).subscribe(userData => {
            // console.log(userData);
            this.user = userData;
            observer.next(userData);
          });
        } else {
          observer.error();
        }
      });
    });
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUser(credentials).then((authData: any) => {
        this.af.database.list('users').update(authData.uid, {
          name: credentials.username,
          email: authData.auth.email,
          provider: 'email'
        });
        credentials.created = true;
        observer.next(credentials);
      }).catch((error: any) => {
        if (error) {
          switch (error.code) {
            case 'INVALID_EMAIL':
              observer.error('E-mail invalid.');
              break;
            case 'EMAIL_TAKEN':
              observer.error('Email Already taken.');
              break;
            case 'NETWORK_ERROR':
              observer.error('Network Error.');
              break;
            default:
              observer.error(error);
          }
        }
      });
    });
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.login(credentials, {
        method: AuthMethods.Password
      }).then((authData) => {
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  logout() {
    this.af.auth.logout();
  }
}
