import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Archivo } from '../upload/file.model';

@Injectable()
export class LoadfileService {

  private basePath:string = '/uploads';
  uploads: FirebaseListObservable<Archivo[]>;

  constructor( public angularFireDatabase: AngularFireDatabase) { }

  getUploads() {
    this.uploads = this.angularFireDatabase.list(this.basePath);
    return this.uploads
  }


  pushUpload(upload: Archivo) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
      }
    );
  }

  private saveFileData(upload: Archivo) {
    this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
  }

  deleteUpload(upload: Archivo) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }

  private deleteFileData(key: string) {
    return this.angularFireDatabase.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name:string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }


}
