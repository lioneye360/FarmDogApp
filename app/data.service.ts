import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Data } from './data';

@Injectable()
export class DataService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private countriesUrl = 'https://restcountries.eu/rest/v1/all';  // URL to web api
  private regionUrl = 'https://restcountries.eu/rest/v1/region/';
  private appID = "&APPID=c260cc6f107b17e999f3d49a7e714d01";
  private weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=";

  constructor(private http: Http) { }

  getRegion(region: string): Promise<Object[]> {
    return this.http.get(this.regionUrl+region)
      .toPromise()
      .then(response => response.json() as Object[])
      .catch(this.handleError);
  }

  getWeather(countryName: string, countryCode: string, capital: string): Promise<Data> {
    var data:Data;
    return this.http.get(this.weatherURL + capital + ',' + countryCode + this.appID)
      .toPromise()
      .then(response => {data = {
        "country": countryName,
        "capital": capital,
        "weather": response.json()["weather"][0]["description"]}; return data;})
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
