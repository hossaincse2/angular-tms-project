
import * as _ from 'lodash';
import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: "ProductFilter"
})
@Injectable()
export class ProductDataFilterPipe implements PipeTransform {
  transform(array: any[], nameQuery:string,modelQuery:string,typeQuery:string): any {
    if (array && array.length){
      return array.filter(item =>{
        if (nameQuery && item.ProductName.toLowerCase().indexOf(nameQuery.toLowerCase()) === -1){
          return false;
        }
        if (modelQuery && item.ModelName.toLowerCase().indexOf(modelQuery.toLowerCase()) === -1){
          return false;
        }
        if (typeQuery && item.TypeName.toLowerCase().indexOf(typeQuery.toLowerCase()) === -1){
          return false;
        }
        return true;
      })
    }
    else{
      return array;
    }
  }
}

@Pipe({
  name: "ProductModelFilter"
})
@Injectable()
export class ProductModelDataFilterPipe implements PipeTransform {
  transform(array: any[],modelQuery:string): any {
    if (array && array.length){
      return array.filter(item =>{
        if (modelQuery && item.Name.toLowerCase().indexOf(modelQuery.toLowerCase()) === -1){
          return false;
        }
        return true;
      })
    }
    else{
      return array;
    }
  }
}


