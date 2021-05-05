import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fileToUpload: File = null;
  imageUrls$: Observable<any>;
  isUploading = false;
  constructor(
    private _firebaseService: FirebaseService,
    private _realTimeDB: AngularFireDatabase
  ) {
    this.imageUrls$ = this._realTimeDB.list('urls').valueChanges();
  }

  fileUpload(files: FileList) {
    this.isUploading = true;
    this.fileToUpload = files.item(0);
    this._firebaseService.uploadImage(this.fileToUpload).then((x) => {
      this.isUploading = false;
    });
  }
}
