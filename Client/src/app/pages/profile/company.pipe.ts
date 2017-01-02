import { Pipe, PipeTransform } from '@angular/core';

const NO_COMPANY = 'No company added.';
const COMPANY_LTD = ' ltd.';

@Pipe({ name: 'companyPipe' })
export class CompanyPipe implements PipeTransform {
    transform(company: string): any {
        if (company) {
            return `"${company} ${COMPANY_LTD}"`;
        }
        else {
            return NO_COMPANY;
        }
    }
}