import { Component, OnInit } from '@angular/core';
import { AboutDataService } from './../../services/about-data.service/about-data.service';

@Component({
    templateUrl: './about.page.html'
})
export class AboutPage {
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
