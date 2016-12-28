import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/core';
import { Data }        from './data';
import { DataService } from './data.service';

@Component({
  moduleId: module.id,
  selector: 'menu',
  templateUrl: 'menu.component.html',
  styleUrls: [ 'menu.component.css' ],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ],
  encapsulation: ViewEncapsulation.None

})
export class MenuComponent implements OnInit {
  countries: Object[] = null;
  data: Data[] = null;
  temp_data: Data[] = null;
  counter: Number;
  private searchBox: string ='';
  menuState:string = 'out';

  selectedContinent: string;
  continents = [
    { name: "Asia"},
    { name: "Africa" },
    { name: "Americas"},
    { name: "Europe" },
    { name: "Oceania"},
    { name: "Polar"}
  ];

  constructor(private dataService: DataService) { }

  onChange(selectedContinent: string) {
    this.selectedContinent = selectedContinent;
    this.data = [];
    this.temp_data = [];
    this.counter = 0;
    this.toggleMenu('out');
    this.searchBox ='';
    this.getRegion();
    var self = this;
    setTimeout(function(){ self.toggleMenu('in'); }, 400);
  }

  getRegion()
  {
    this.dataService.getRegion(this.selectedContinent)
      .then(countries => {this.countries = countries; this.getWeatherList();});
  }

  getWeatherList()
  {
    this.temp_data = [];
    this.counter = 0;
    for (let country of this.countries) {
      this.dataService.getWeather(country["name"], country["alpha2Code"], country["capital"])
        .then(data => {
          this.temp_data.push(data);
          this.counter = +this.counter+1;
          if(this.counter >= this.countries.length-1)
            this.data = this.temp_data;
        });
    }
  }

  getWeather(countryName: string, countryCode: string, capital: string)
  {
    this.dataService.getWeather(countryName, countryCode, capital)
      .then(data => this.data.push(data));
  }

  toggleMenu(state: string) {
    this.menuState = state === 'out' ? 'in' : 'out';
  }

  ngOnInit(): void {
    this.selectedContinent = "Americas";
    this.data = [];
    this.getRegion();
  }
}
