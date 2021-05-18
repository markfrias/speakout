import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'demo'
})


export class DemoPipe implements PipeTransform {
    transform(s: string): string {
        let newString = "";
        let vowelArray = ['a', 'e', 'i', 'o', 'u'];
        for (let i = 0; i < s.length; i++) {
            if (vowelArray.includes(s.charAt(i))) {
                newString = newString + s.charAt(i).toUpperCase();
            } else {
                newString = newString + s.charAt(i);
            }
        }


        return newString;
    }
}
