import { Component } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-photo-capture',
  standalone: true,
  imports: [FormsModule,NgIf,WebcamModule,MatButtonModule],
  templateUrl: './photo-capture.component.html',
  styleUrl: './photo-capture.component.scss'
})
export class PhotoCaptureComponent {
  constructor(private trigger: Subject<void> = new Subject<void>(),
  public triggerObservable: Observable<void> = this.trigger.asObservable())

  {



  }

  public _WebcamImage!: WebcamImage;
  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this._WebcamImage = webcamImage;
  }
}
