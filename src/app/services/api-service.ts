import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartCollection } from '../interfaces/part.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = 'https://localhost:8000/api';

  constructor(private http: HttpClient) {}


  getParts(page: number = 1): Observable<PartCollection> {
    const params = new HttpParams()
    .set('page', page);

    return this.http.get<PartCollection>(`${this.apiUrl}/parts`, { params });
  }
  
}