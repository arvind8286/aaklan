import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-admin',
  standalone: true,
  imports: [],
  templateUrl: './logout-admin.component.html',
  styleUrl: './logout-admin.component.scss'
})
export class LogoutAdminComponent {
  constructor(
    private _rout:Router
  )
  {
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken');
      _rout.navigateByUrl('/login')
  }

}
