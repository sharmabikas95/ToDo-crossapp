import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { LoginEmailPage } from '../pages/auth/login-email/login-email';
import { SignUpPage } from '../pages/auth/sign-up/sign-up';

import { TaskPage } from '../pages/task/task';

import { AngularFireModule } from 'angularfire2';

// Providers
import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyC8F9TJXJugvmgXVT4DLC13KhmD9FPRM1M",
    authDomain: "todo-181a5.firebaseapp.com",
    databaseURL: "https://todo-181a5.firebaseio.com",
    projectId: "todo-181a5",
    storageBucket: "todo-181a5.appspot.com",
};

@NgModule({
  declarations: [
    MyApp,
    LoginEmailPage,
    SignUpPage,
    TaskPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginEmailPage,
    SignUpPage,
    TaskPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, DataProvider, AuthProvider]
})
export class AppModule {}
