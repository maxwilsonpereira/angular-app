export interface Coin {
  id: string;
  symbol: string;
  name: string;
}

export interface APIResponse<T> {
  results: Array<T>;
}
