import { Component, OnInit } from '@angular/core';
import { AboutDataService } from './../../shared/services/about-data.service';


@Component({
    templateUrl: './get-started.html'
})
export class GetStartedComponent {
    private aboutData: string[];

    constructor(private aboutDataService: AboutDataService) {
        this.aboutData = [];
    }

    ngOnInit() {
        this.aboutDataService.getAllAboutData()
            .subscribe(aboutData => {

                this.aboutData = aboutData[0].data;
            });
    }
};
