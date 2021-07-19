import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Coin } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public coins: Array<Coin> = [];
  public coinsToDisplay: Array<Coin> = [];
  public coinsToDisplayMemory: Array<Coin> = [];
  private coinSub!: Subscription;
  public routeSub!: Subscription;
  public loading: boolean = true;
  public pageNumber: number = 0;
  private itemsPerPage = 20;
  public totalPages: number = 0;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.fetchCoins();
  }

  fetchCoins(): void {
    this.coinSub = this.httpService.loadCoins.subscribe((response: any) => {
      this.coins = response;
      this.coinsToDisplayMemory = this.coinsToDisplay = response.slice(
        0,
        this.itemsPerPage
      );
      this.totalPages = Math.round(response.length / this.itemsPerPage);
      this.loading = false;
    });
  }

  setPageNumber(pageNumber: number): void {
    this.pageNumber = pageNumber;
    const start = this.pageNumber * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.coinsToDisplayMemory = this.coins;
    this.coinsToDisplayMemory = this.coinsToDisplay = this.coins.slice(
      start,
      end
    );
  }

  sortById(): void {
    this.coinsToDisplay.sort((a, b) => (a.id < b.id ? -1 : 1));
  }
  sortByName(): void {
    this.coinsToDisplay.sort((a, b) => (a.name < b.name ? -1 : 1));
  }
  sortBySymbol(): void {
    this.coinsToDisplay.sort((a, b) => (a.symbol < b.symbol ? -1 : 1));
  }

  filterByName(event: any): void {
    const auxArray = this.coinsToDisplayMemory.reduce(
      (acum: any, current: any) => {
        if (
          current.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
          acum.push(current);
        return acum;
      },
      []
    );
    this.coinsToDisplay = auxArray;
  }

  filterBySymbol(event: any): void {
    const auxArray = this.coinsToDisplayMemory.reduce(
      (acum: any, current: any) => {
        if (
          current.symbol
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
          acum.push(current);
        return acum;
      },
      []
    );
    this.coinsToDisplay = auxArray;
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
