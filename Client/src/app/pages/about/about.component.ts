import { Component, OnInit } from '@angular/core';
import { AboutDataService } from './about.service';

@Component({
    templateUrl: './about.html'
})
export class AboutPageComponent {
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
