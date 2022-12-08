import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game } from '../interfaces/game';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiURL = "https://jsonplaceholder.typicode.com";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/games/')

    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(game: Game): Observable<any> {

    return this.httpClient.post(this.apiURL + '/games/', JSON.stringify(game), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/games/' + id)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, game:Game): Observable<any> {

    return this.httpClient.put(this.apiURL + '/games/' + id, JSON.stringify(game), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/games/' + id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
