import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent implements OnInit {
//2017125009 박지웅
  @Input() rating:number

  constructor() { }

  ngOnInit(): void {
  }

}
