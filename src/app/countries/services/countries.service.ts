import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';
import { Observable, of, tap, map, count, combineLatest } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseUrl: string = `https://restcountries.com/v3.1`;

  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  constructor(private httpClient: HttpClient) {}

  get regions(): Region[] {
    return [...this._regions];
  }

  getcountriesByRegion(region: Region): Observable<SmallCountry[]> {
    console.log('La region es ' + region);

    if (!region) return of([]);

    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) =>
        countries.map((country) => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      ),
      tap((response) => console.log({ response }))
    );
  }

  getCountryByAlphaCode( alphaCode: string ): Observable <SmallCountry>{
    console.log({alphaCode});
    
    const url : string = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.httpClient.get<Country>(url)
    .pipe(
      map( country => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? []
      }) )
    )
  }

  getCountryBordersByCodes(borders: string[]): Observable<SmallCountry[]>{
    if (!borders || borders.length === 0) return of([]);

    const countriesRequest:Observable<SmallCountry>[] = [];

    borders.forEach(code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequest.push(request);
    })

    return combineLatest(countriesRequest);
  }
}
