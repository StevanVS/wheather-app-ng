import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherAPIService {
  private url = new URL('https://api.openweathermap.org/data/2.5/weather');
  constructor(private http: HttpClient) {
    this.url.searchParams.append('APPID', environment.wheaterApiKey);
    this.url.searchParams.append('units', 'metric');
    this.url.searchParams.append('lang', 'es');
  }
  getWeather(city: string) {
    return this.http.get<any>(`${this.url.href}&q=${city}`);
  }
}
