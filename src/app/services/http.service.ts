import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Coin } from '../models';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private cachedCoins!: Observable<APIResponse<Coin>>;

  constructor(private http: HttpClient) {}

  get loadCoins() {
    if (!this.cachedCoins) {
      this.cachedCoins = this.getCoinList().pipe(shareReplay(1));
    }
    return this.cachedCoins;
  }

  getCoinList(): Observable<APIResponse<Coin>> {
    return this.http.get<APIResponse<Coin>>(`${env.BASE_URL}/coins/list`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  getCoinDetails(id: string): Observable<any> {
    return this.http.get<APIResponse<any>>(`${env.BASE_URL}/coins/${id}`);
  }
}
