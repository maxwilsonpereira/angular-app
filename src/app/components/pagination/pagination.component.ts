import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() pageNumber: any;
  @Input() totalPages!: number;
  // @Input() setPageNumber!: (pageNumber: number) => void;
  @Output() pageNumberChanged: EventEmitter<number> = new EventEmitter();
  public page!: number;
  constructor() {}

  setPageNumber(page: number) {
    this.pageNumberChanged.next(page);
  }
  setPage(event: any): void {
    var code = event.keyCode || event.which;
    if (event.target.value < 1) return;
    if (code === 13) this.goToPage();
    this.page = event.target.value;
  }
  goToPage(): void {
    if (this.page < 1) return;
    if (this.page - 1 > this.totalPages) {
      alert('Last page: ' + (this.totalPages + 1));
      return;
    }
    this.pageNumberChanged.next(this.page - 1);
  }

  ngOnInit(): void {}
}
