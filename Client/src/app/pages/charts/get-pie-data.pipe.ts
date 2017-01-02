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

        let hoursLeft = ((timeLeft / 60000) / 60).toFixed();
        let hoursSpent = ((timeSpent / 60000) / 60).toFixed();
           
        pieData.push({category: 'Time left', value: hoursLeft});
        pieData.push({category: 'Time spent', value: hoursSpent});

        return pieData;
    }
}