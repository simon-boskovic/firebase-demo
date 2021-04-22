import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fileToUpload: File = null;
  constructor(private _firebaseService: FirebaseService) {
    this._firebaseService.getAllImages();
  }

  fileUpload(files: FileList) {
    this.fileToUpload = files.item(0);
    this._firebaseService.upload(this.fileToUpload);
  }
}
