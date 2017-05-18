import { Component } from '@angular/core';

import { NavController, ToastController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { LoginEmailPage } from '../auth/login-email/login-email';
import {DataProvider} from '../../providers/data';
import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-task',
  templateUrl: 'task.html'
})
export class TaskPage {

  data: FirebaseListObservable<any>;
  user: any;
  taskName: string;
  taskList: any;
  constructor(public navCtrl: NavController, private auth: AuthProvider, public af: AngularFire, public toastCtrl: ToastController, private dataProvider: DataProvider) {
     this.data = this.af.database.list('/tasks');
     this.user = {
      name: ''
    };
  }

  ngOnInit(){

    this.af.auth.subscribe(authData => {
      if (authData) {
            this.dataProvider.object('users/' + authData.uid).subscribe(userData => {
              this.user = userData;

              // --
              //  To Do list

                this.af.database.list('/tasks').subscribe(result => {
                    if(result){
                      var f = [];
                      for(var key in result){
                        if(result[key].userId == userData.email){
                            f.push(result[key]);
                        }
                      }
                      this.taskList = f;
                    }
                  },ex => {
                      console.log('Found exception: ', ex);
                  });

            });
          }
    });


  }

  logout(){
    this.auth.logout();
    this.navCtrl.setRoot(LoginEmailPage);
  }

  addTask(){
    if(this.taskName){
      this.data.push({
        taskName: this.taskName,
        userId: this.user.email,
        mark: false
      }).then( newBill => {
        let toast = this.toastCtrl.create({
            message: this.taskName + ' had been added successfully',
            duration: 2000,
            position: "middle"
          });
          toast.present();
          this.taskName = '';
        this.ngOnInit();
      }, error => {
        console.log(error);
      });
    }
  }

  deleteTask(task){
      this.data.remove(task.$key);
      let toast = this.toastCtrl.create({
        message: task.taskName + ' had been deleted successfully',
        duration: 2000,
        position: "middle"
      });
      toast.present();
      this.ngOnInit();
  }

  updateTask(task){
      this.data.update(task.$key, {
          taskName: task.taskName,
          userId: this.user.email,
          mark: true,
        });
      let toast = this.toastCtrl.create({
        message: task.taskName + ' had been updated successfully',
        duration: 2000,
        position: "middle"
      });
      toast.present();
      this.ngOnInit();
  }
}
