import { Component, OnInit } from '@angular/core';
import { AboutDataService } from './../../services/about-data.service/about-data.service';


@Component({
    templateUrl: './get-started.html'
})
export class GetStartedPage {
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
