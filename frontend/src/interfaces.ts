export interface DropdownItem {
  key: string;
  value: string;
}

export interface ConverterContext {
  base_currency: string;
  quote_currency: string;
  base_amount: number;
}

export interface ConverterResponse {
  exchange_rate: number;
  quote_amount: number;
}
