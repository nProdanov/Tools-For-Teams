import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Auth } from '../../services/auth.service/auth.service';
import { ToastsManager } from 'ng2-toastr';
import { StorageService } from '../../services/storage.service/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public profile: any;
  newProjectVisible : boolean;

  constructor(private stroageService: StorageService, private service: Auth, public toastr: ToastsManager, public vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
    this.profile = {};
    this.newProjectVisible = false;
  }

  ngOnInit() {

    this.stroageService
      .getProfileItem()
      .subscribe(resProfile => this.profile = resProfile);
  }
}
