import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

    private heroesUrl = 'api/heroes'; //URL to web api
    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }

    getHeroes(): Observable<Hero[]> {
        // Todo: send the message _after_ fetching the heroes
        this.messageService.add('HeroService: fetched heroes');
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
                tap(heroes => this.log('fetched heroes')),
                catchError(this.handleError('getHeroes',[]))
            );
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }
}
