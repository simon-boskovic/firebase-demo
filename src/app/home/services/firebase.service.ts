import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { concatMap, filter, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private _fireStorage: AngularFireStorage,
    private _firestore: AngularFirestore,
    private _fireDb: AngularFireDatabase
  ) {}

  uploadImage(fileToUpload: File) {
    return this._fireStorage
      .upload('images/' + fileToUpload.name, fileToUpload)
      .then((res) => {
        if (res) {
          this._uploadUrl(`images/${fileToUpload.name}`);
        }
      });
  }

  private _uploadUrl(path: string) {
    let imgUrl: string;
    this._fireStorage
      .ref(path)
      .getDownloadURL()
      .pipe(
        filter((x) => !!x),
        take(1),
        tap((url) => {
          imgUrl = url;
        }),
        concatMap(() => this._fireDb.list('/urls').push(imgUrl))
      )
      .subscribe();
  }
}
