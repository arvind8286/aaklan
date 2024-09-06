import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { WebcamModule } from 'ngx-webcam';


@Component({
  selector: 'app-video-recording',
  standalone: true,
  imports: [FormsModule,NgIf,WebcamModule,MatButtonModule],

  templateUrl: './video-recording.component.html',
  styleUrl: './video-recording.component.scss'
})
export class VideoRecordingComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('playbackElement') playbackElement!: ElementRef<HTMLVideoElement>;

  mediaRecorder!: MediaRecorder;
  recordedChunks: Blob[] = [];
  isRecording: boolean = false;
  recordedVideoUrl: string = '';
  recordedBlob!: Blob;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startCamera();
    }
  }

  startCamera(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.videoElement.nativeElement.srcObject = stream;
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.ondataavailable = event => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          this.recordedBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
          this.recordedVideoUrl = URL.createObjectURL(this.recordedBlob);
          this.playbackElement.nativeElement.src = this.recordedVideoUrl;
          this.isRecording = false;
        };
      })
      .catch(err => console.error('Error accessing camera: ', err));
  }

  startRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
      this.recordedChunks = [];
      this.mediaRecorder.start();
      this.isRecording = true;
    }
  }

  stopRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }
  }

  downloadRecording(): void {
    const downloadUrl = URL.createObjectURL(this.recordedBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = downloadUrl;
    a.download = 'recording.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
  }


}
