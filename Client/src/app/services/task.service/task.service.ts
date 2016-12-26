import { Task } from '../../models/task.model/task.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class TaskService {
    private taskUrl = 'http://localhost:3001/api/tasks';

    constructor(private http: Http) { }

    saveTask(body: Task): Observable<any> {
        return this.http.post(this.taskUrl, body)
            .map(response => {
                let data = response.json();
                return data;
            });
    }
};
