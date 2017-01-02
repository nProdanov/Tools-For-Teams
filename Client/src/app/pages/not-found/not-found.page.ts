import { Component, HostBinding } from '@angular/core';

@Component({
    templateUrl: './not-found.page.html',
    styleUrls: ['./not-found.page.css']
})
export class NotFoundPage {
    @HostBinding('class') classes = 'landing-page';
}
