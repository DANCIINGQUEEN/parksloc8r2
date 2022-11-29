import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {

  public compare(a, b) {
    const createdOnA = a.createdOn
    const CreatedOnB = b.createdOn

    let comparison = 1
    if (createdOnA > CreatedOnB) {
      comparison = -1
    }
    return comparison
  }
//2017125009 박지웅
  transform(reviews: any[]): any[] {
    if (reviews && reviews.length) {
      return reviews.sort(this.compare);
    }
    return null
  }

}
