import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionTotal'
})
export class QuestionTotalPipe implements PipeTransform {

  transform(value: number,easy: number,medium: number, hard:number): any {
    
    
    return easy+medium+hard;
  }

}
