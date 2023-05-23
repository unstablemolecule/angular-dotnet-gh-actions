import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment as env } from '@env';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private http: HttpClient) { }

    private readonly baseUrl = env.baseUrl;
    forecast: any;

    ngOnInit(): void {
        this.getWeatherForecast();
    }

    getWeatherForecast() {
        this.http.get('http://localhost:5000/api/WeatherForecast')
            .subscribe(forecast => this.forecast = forecast);
    }

    title = 'angular-dotnet-gh-actions';
}
