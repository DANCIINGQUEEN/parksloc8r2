import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }

  public pageContent={
    header:{
      title:'Loc8r',
      strapline:'Find places to work with wifi near you! 2017125009'
    },
    sidebar:'Looking for wifi and a seat? Loc8r helps you\n' +
      '    find places to work when out and about. Perhaps with coffee,\n' +
      '    cake or a pint? Let Loc8r help you find the place you\'re\n' +
      '    looking for.'
  }

}
