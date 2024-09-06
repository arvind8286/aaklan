import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoutaccesor',
  standalone: true,
  imports: [],
  templateUrl: './logoutaccesor.component.html',
  styleUrl: './logoutaccesor.component.scss'
})
export class LogoutaccesorComponent {
  constructor(
    private _rout:Router
  )
  {
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken');
      _rout.navigateByUrl('/assessorlogin')
  }

}
