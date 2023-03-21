import { WeatherAPIService } from './../../services/weather-api.service';
import { Weather } from './../../models/weather.interface';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
})
export class WeatherCardComponent {
  cityForm = this.fb.group({
    city: ['Chone', Validators.required],
  });

  isLoading = true;
  weather: Weather = {
    name: 'Ciudad',
    temperature: 0,
    humidity: 0,
    description: 'Descripción',
    icon: '',
  };

  weatherIconUrl = '/assets/icons/01n@4x.png';

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherAPIService
  ) {}

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (value) => {
        this.isLoading = false;

        this.weather.name = value.name.toUpperCase();
        this.weather.description = value.weather[0].description.toUpperCase();
        this.weather.temperature = value.main.temp;
        this.weather.humidity = value.main.humidity;
        this.weather.icon = value.weather[0].icon;

        this.weatherIconUrl = `https://openweathermap.org/img/wn/${this.weather.icon}@4x.png`;

        // console.log(value);
      },
    });
  }

  onSubmit() {
    this.getWeather(this.cityForm.value.city ?? '');
  }

  ngOnInit() {
    this.getWeather('Chone');
  }
}
