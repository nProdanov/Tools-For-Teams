import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getTasksValuesPipe' })
export class GetTasksValuesPipe implements PipeTransform {
    transform(tasks: any[]): any {

        let tasksValues = [];
        let cost = [];
        let hours = [];

        tasksValues.push([0,0]);

        for (let task of tasks) {
            let previousCost = 0;
            if(cost.length > 0) {
                previousCost = cost[cost.length - 1];
            }
            let currentCost = task.cost;
            cost.push(currentCost + previousCost);
;

            let previousHours = 0;
            if (hours.length > 0) {
                previousHours = hours[hours.length - 1];
            }
            let currentHours = +task.timeForExecution;                    
            hours.push(currentHours + previousHours);

            tasksValues.push([currentCost + previousCost, currentHours + previousHours])
        }

        return tasksValues;
    }
}