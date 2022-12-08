import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game } from '../interfaces/game';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiURL = "http://127.0.0.1:8080";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/jogos')

    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(game: Game): Observable<any> {

    return this.httpClient.post(this.apiURL + '/jogos/', JSON.stringify(game), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  findById(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/jogos/' + id)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, game:Game): Observable<any> {

    return this.httpClient.put(this.apiURL + '/jogos/' + id, JSON.stringify(game), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/jogos/' + id, this.httpOptions)

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
