import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss'],
})
export class CoinDetailsComponent implements OnInit, OnDestroy {
  coinId: string;
  coinSub!: Subscription;
  coinDetails: any;
  routeSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.coinId = '';
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.coinId = params['id'];
      this.getCoinDetails(this.coinId);
    });
  }

  getCoinDetails(id: string): void {
    this.coinSub = this.httpService
      .getCoinDetails(id)
      .subscribe((response: any) => {
        this.coinDetails = response;
      });
  }

  ngOnDestroy(): void {
    if (this.coinSub) {
      this.coinSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
