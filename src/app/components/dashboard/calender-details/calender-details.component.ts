import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-calender-details',
  standalone: true,
  imports: [MatCardModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './calender-details.component.html',
  styleUrl: './calender-details.component.scss'
})
export class CalenderDetailsComponent {

}
