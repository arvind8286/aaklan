import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavigationStart, Route, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser, Location, NgFor } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';
import { UploadimgserveService } from '../../../core/services/candidate/uploadimgserve.service';
import { APIResponse } from '../../../core/models/API.Models';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { GeolocationService } from '../../../core/services/candidate/geolocation.service';

@Component({
  selector: 'app-capture-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgxDropzoneModule,
    MatButton,
    MatButtonModule,
    FormsModule,
    NgFor,
    CommonModule,
    WebcamModule
  ],
  templateUrl: './capture-details.component.html',
  styleUrl: './capture-details.component.scss',
})
export class CaptureDetailsComponent {

  sname: any;
  constructor(
    private uploadserv: UploadimgserveService,
    private routs:Router,
    private sendlocation:GeolocationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.sname = localStorage.getItem('username');
    //this.startCamera();
  }

  // sweetalert toster setting
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  //sweetalert tostet setting end
  stream:any=null;
  trigger:Subject<void>=new Subject();
  previewimg:string='';
  get $trigger():Observable<void>{
    return this.trigger.asObservable();
  }
  snapshort(event:WebcamImage)
  {
    console.log(event)
    this.previewimg=event.imageAsDataUrl;
    this.imgdata=event.imageAsBase64
  }
  startCamera() {
    // this.generateRandomNumber();

    navigator.mediaDevices.getUserMedia({
      video:{
        width:300,
        height:300
      }
    }).then((res)=>{
     // console.log("response",res);
     //this.toast.fire('Alert','Something wrong','error')
      this.stream=res;

    }).catch(er=>{
      console.log(er);
      if(er?.message=='Permission denied')
      {
        this.toast.fire('Error from Camera ', 'Please allow camera to aceess Permision', 'error');
        // console.log("Please allow camera to aceess Permision")
      }
      else
      {
        this.toast.fire('Error from Camera ', 'Please Install camera in your System Please', 'error');
      }
    })

  }


  videoWidth = 350;
  videoHeight = 250;
  files: File[] = [];
  imgdata: any;
  fileupload: any;
  capture() {
    // this.startCamera();
    this.trigger.next();
    this.imgdata=this.previewimg;
   // this.getLocation();

  }
  // base64!:string;

  async onSelect(event: any) {
    //console.log(event);
    this.files.push(...event.addedFiles);
    // const base64Files = await Promise.all(this.files.map(file => this.fileToBase64(file)));
    this.fileupload = await Promise.all(
      this.files.map((file) => this.fileToBase64(file))
    );
    // console.log(base64Files);
  }

  async onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    // const base64Files = await Promise.all(this.files.map(file => this.fileToBase64(file)));
    this.fileupload = await Promise.all(
      this.files.map((file) => this.fileToBase64(file))
    );
    // console.log(base64Files);
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  /*async handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      console.error('No files selected');
      return;
    }

    const files = Array.from(input.files);
    const base64Files = await Promise.all(files.map(file => this.fileToBase64(file)));

    //this.sendFilesToApi(base64Files);
    console.log(base64Files);
  }*/
  doc: any;
  flag=false;
  uploadfile() {
    console.log(this.imgdata);
    //console.log(this.fileupload);
   // if (this.imgdata !==undefined )
      if (this.fileupload !==undefined || this.imgdata !==undefined )
      {
        if(this.fileupload !==undefined)
          {
        this.doc = {
        "images": [
          // {
          //   "fieldname": 'capture_image',
          //   "base64": this.imgdata
          // },
          {
            "fieldname": 'uploaded_image',
            "base64": this.fileupload[0]
          }

        ]
        };
        }

        if(this.imgdata !==undefined)
          {
        this.doc = {
        "images": [
          {
            "fieldname": 'capture_image',
            "base64": this.imgdata
          }//,
          // {
          //   "fieldname": 'uploaded_image',
          //   "base64": this.fileupload[0]
          // }

        ]
        };
        }

        if((this.imgdata !==undefined) && (this.fileupload !==undefined))
          {
        this.doc = {
        "images": [
          {
            "fieldname": 'capture_image',
            "base64": this.imgdata
          },
          {
            "fieldname": 'uploaded_image',
            "base64": this.fileupload[0]
          }

        ]
        };
        }



      console.log(this.doc);
      this.uploadserv.uploaddoc(this.doc).subscribe((res: APIResponse) => {
        if(res.status=="success")
          {
            this.toast.fire('Image Upload ', res.message, 'success');
            this.flag=true;
          }
          else
          {
            this.toast.fire('Error from api ', res.message, 'error');
            this.flag=false;

          }

      });
    }
    else
    {
      this.toast.fire('Alert Image upload ', 'Please Capture image or Upload Image ', 'error');

    }
  }

  pretest() {
    this.routs.navigateByUrl("/pretest");
    }


    //location capture
    locationJs:any;
    getLocation() {
      if (isPlatformBrowser(this.platformId)) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.locationJs = position.coords;
              console.log("location latitude="+this.locationJs.latitude);
              console.log("location longitude= "+this.locationJs.longitude);
            },
            (error) => {
              console.log(error);

            }
          );
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      } else {
        console.log("Navigator is not available on the server.");
      }
    }

    //location logic end
}
