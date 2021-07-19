import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coin-list',
  templateUrl: 'coin-list.component.html',
  styleUrls: ['coin-list.component.scss'],
})
export class CoinListComponent implements OnInit {
  @Input() coinsToDisplay: any;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  openCoinDetails(id: string): void {
    this.router.navigate(['coin-details', id]);
  }
}
