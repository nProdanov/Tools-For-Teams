import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Auth } from '../../services/auth.service/auth.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public profile: any;

  constructor(private service: Auth, public toastr: ToastsManager, public vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
  }
}
