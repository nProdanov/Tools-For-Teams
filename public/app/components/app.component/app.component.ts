import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth.service/auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public profile: any;

  constructor(private service: Auth) {
  }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }
}
