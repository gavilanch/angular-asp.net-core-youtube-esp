import { WeatherforecastService } from './weatherforecast.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  weatherForecastService = inject(WeatherforecastService);
  climas: any[] = [];

  constructor(){
    this.weatherForecastService.obtenerClima().subscribe(datos => {
      this.climas = datos;
    });
  }

}
