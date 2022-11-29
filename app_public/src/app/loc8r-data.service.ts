import {Injectable} from '@angular/core';
//HTTP 서비스를 현재의 서비스에 주입
import {HttpClient, HttpHeaders} from "@angular/common/http";
//애플리케이션에 HTTPClientModule 을 임포트해서 이용 가능함을 보장
import {Location, Review} from './location'
import {environment} from "../environments/environment";

//2017125009 박지웅
@Injectable({
  providedIn: 'root'
})
export class Loc8rDataService {

  constructor(private http: HttpClient) {
  }

  // private apiBaseUrl = 'http://localhost:3000/api'
  private apiBaseUrl=environment.apiBaseUrl

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    // const lng: number = 126.97242745635705
    // const lat: number = 37.58564052171159
    const maxDistance: number = 2000000
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location[])
      .catch(this.handleError)
  }

  public getLocationById(locationId: string): Promise<Location> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location)
      .catch(this.handleError)
  }

  public addReviewByLocationId(locationId: string, formData: Review): Promise<Review> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}/reviews`
    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong", error)
    return Promise.reject(error.message || error)
  }
}
