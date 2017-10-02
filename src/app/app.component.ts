import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCA0vJPBzNI_uOeKWkk5skmEIqkYDagFAY',
      authDomain: 'comprasapp-83618.firebaseapp.com',
      databaseURL: 'https://comprasapp-83618.firebaseio.com',
      projectId: 'comprasapp-83618',
      storageBucket: 'comprasapp-83618.appspot.com',
      messagingSenderId: '1004906173037'
    });
  }
}
