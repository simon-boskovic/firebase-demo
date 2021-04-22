import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private _fireStorage: AngularFireStorage) {}

  getAllImages() {
    return this._fireStorage.storage
      .ref()
      .child('images/')
      .getDownloadURL()
      .then((res) => {
        console.log(res);
      });
  }

  upload(fileToUpload: File) {
    this._fireStorage
      .upload('images/' + fileToUpload.name, fileToUpload)
      .then((res) => {
        console.log(res);
      });
  }
}
