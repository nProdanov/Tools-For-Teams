import { AboutData } from './about.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class AboutDataService {
    private aboutUrl = 'http://localhost:3001/api/about';

    constructor(private http: Http) { }

    getAllAboutData(): Observable<any> {
        return this.http.get(`${this.aboutUrl}`)
            .map((response: any) => {
                let data = response.json();

                return data;
            });
    }
};
