import { Component } from '@angular/core';
import { PhotoCaptureComponent } from "./photo-capture/photo-capture.component";
import { VideoRecordingComponent } from "./video-recording/video-recording.component";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-webcam',
  standalone: true,
  imports: [PhotoCaptureComponent, VideoRecordingComponent,MatCardModule],
  templateUrl: './webcam.component.html',
  styleUrl: './webcam.component.scss'
})
export class WebcamComponent {


}
