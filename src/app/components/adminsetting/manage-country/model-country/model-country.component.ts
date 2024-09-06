import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { APIResponse, country } from '../../../../core/models/API.Models';
import { CommonModule } from '@angular/common';
import { CountrydataService } from '../../../../core/services/countrydata.service';
import Swal from 'sweetalert2';
import { DialogRef } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-model-country',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,FormsModule,CommonModule,MatButtonModule,MatInputModule],
  templateUrl: './model-country.component.html',
  styleUrl: './model-country.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('in <=> out', animate('300ms ease-in-out')),
    ])
  ]
})
export class ModelCountryComponent {
  @Input() isOpen = false;

  get stateName() {
    return this.isOpen ? 'in' : 'out';
  }
  constructor(
    private contryserv: CountrydataService,
    private _formBuilder: FormBuilder,
  //  private _dialogref:DialogRef<ModelCountryComponent>

  )
  {

  }
  // sweetalert toster setting
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });
  objcontry: country = new country();
  obj:any;
  onCountrysave() {
    //  debugger;
    //  console.log(this.objcontry);
    this.obj = {
      country_name: this.objcontry.country_name.toString(),
      country_code: this.objcontry.country_code.toString(),
      dial: this.objcontry.dial.toString(),
    };
    this.contryserv.addcountry(this.obj).subscribe((res: APIResponse) => {
      if (res.status == 'success') {
        // alert(res.message);
        this.toast.fire('Add Country', res.message, 'success');
      //  this._dialogref.close();
        //this.getAllcontry();
      } else {
        //alert(res.message);
       // this.getAllcontry();
        this.toast.fire('Error', res.message, 'error');
      }
    });
  }
}
