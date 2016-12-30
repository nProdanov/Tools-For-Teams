import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getPieDataPipe' })
export class GetPieDataPipe implements PipeTransform {
    transform(task: any): any {

        let createdAt = new Date(task.createdAt);
        let timeForExecution: number = task.timeForExecution;
        let deadline = createdAt.setHours(createdAt.getHours() + timeForExecution);
        let now = Date.now();
        
        // if () {

        // }
    }

    
}