import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getPieDataPipe' })
export class GetPieDataPipe implements PipeTransform {
    transform(task: any): any {

        let pieData = [];
        
        let timeForExecution: number = +task.timeForExecution;
        let createdAt = new Date(task.createdAt);
        let now = new Date(Date.now()); 
        let deadline = new Date(createdAt.getTime());
        deadline.setHours(deadline.getHours() + timeForExecution);
        let timeSpent = now.getTime() - createdAt.getTime();
        let timeLeft = deadline.getTime() - now.getTime();

        if (timeLeft < 1) {
            timeLeft = 0;
        }
           
        pieData.push({category: 'Time left', value: timeLeft});
        pieData.push({category: 'Time spent', value: timeSpent});

        return pieData;
    }
}