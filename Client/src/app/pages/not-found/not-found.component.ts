import { Component, HostBinding } from '@angular/core';

@Component({
    templateUrl: './not-found.html',
    styleUrls: ['./not-found.css']
})
export class NotFoundComponent {
    @HostBinding('class') classes = 'landing-page';
}
