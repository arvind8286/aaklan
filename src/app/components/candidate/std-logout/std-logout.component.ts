import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-std-logout',
  standalone: true,
  imports: [],
  templateUrl: './std-logout.component.html',
  styleUrl: './std-logout.component.scss'
})
export class StdLogoutComponent {

  constructor(
    private _rout:Router
  )
  {
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken');
      _rout.navigateByUrl('/studentLogin')
  }

}
