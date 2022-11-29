import {Component, OnInit} from '@angular/core';
import {Loc8rDataService} from "../loc8r-data.service";
import {GeolocationService} from "../geolocation.service";

import {Location} from "../location"

//OnInit : 앵귤러 라이프사이클 메소드
// 애플리케이션 실행을 시작하면 어떤 사건이 특별한 순서로 일어나도록 해줌

// export class Location {
//   _id!: string;
//   name!: string;
//   distance!: number;
//   address!: string;
//   rating!: number;
//   facilities!: string[];
//   reviews!:any[]
//   coords!:number[]
//   openingTimes!:any[]
// }

// 2017125009  박지웅
@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor(private loc8rDataService: Loc8rDataService,
              private geolocationService: GeolocationService) {
  }

  public locations: Location[]

  public message: string

  ngOnInit() {
    this.getPosition()
  }
  private getPosition() :void{
    this.message='Getting your location....'
    this.geolocationService.getPosition(
      this.getLocations.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    )
  }
//2017125009 박지웅
  private getLocations(position: any): void {
    this.message = 'Searching for nearby places'
    const lat:number=position.coords.latitude
    const lng:number=position.coords.longitude
    this.loc8rDataService
      .getLocations(lat, lng)
      .then(foundLocations => {
        this.message = foundLocations.length > 0 ? '' : 'No Locations Found'
        this.locations = foundLocations
      })
  }

  private showError(error: any): void {
    this.message = error.message
  }
  private noGeo():void{
    this.message='Geolocation not supported by this browser'
  }

}
