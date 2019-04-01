import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'removeSpace'
})
export class RemoveSpacePipe implements PipeTransform {
  tot = [];
  a;
  transform(value?: string, args?: object, cat_difficulty?: string): any {
    // console.log(`value : ${value} args: ${args}  cat_difficulty: ${cat_difficulty}`,args);

    var total = value.replace(/ /g, '');
    if (cat_difficulty === '') {
      console.log(args);

      return args["E_" + total] + args["M_" + total] + args["H_" + total];
    }
    else if (cat_difficulty === "E_")
      return args["E_" + total];
    else if (cat_difficulty === "M_")
      return args["M_" + total];
    else if (cat_difficulty === "H_")
      return args["H_" + total];

    // var number 
    // var easy="E_"+value.replace(/ /g,'');
    // var medium="M_"+value.replace(/ /g,'');
    // var hard="H_"+value.replace(/ /g,'');
    // console.log(args[easy]+"easy");
    // console.log(args[medium]+"medium");

    // console.log(args[hard]+"hard");





  }

}
