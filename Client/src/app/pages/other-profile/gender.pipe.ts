import { Pipe, PipeTransform } from '@angular/core';

const GENDER_MALE_STRING = 'Male';
const GENDER_FEMALE_STRING = 'Female';

@Pipe({ name: 'genderPipe' })
export class GenderPipe implements PipeTransform {
    transform(genderSign: string): any {
        if (genderSign === 'm') {
            return GENDER_MALE_STRING;
        }
        else {
            return GENDER_FEMALE_STRING;
        }
    }
}