

import * as _ from 'lodash';
import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'getAllOrganizationDataFilter'
})
export class OrganizationDataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.OrganizationName.indexOf(query) > -1);
        }
        return array;
    }
}


@Pipe({
    name: 'getAllBranchDataFilter'
})
export class BranchDataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.BranchName.indexOf(query) > -1);
        }
        return array;
    }
}


@Pipe({
    name: 'accessRightName'
})
export class GetAccessRightName implements PipeTransform {
    transform(array: any[], query: string): any {
       console.log(array);
       array = _.filter(array, row => row.id === query);
        return array.values;
    }
}
