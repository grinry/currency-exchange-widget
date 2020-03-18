export interface IDropdownItem {
    key: string;
    value: string;
}

export interface IConverterContext {
    base_currency: string;
    quote_currency: string;
    base_amount: number;
}

export interface IConverterResponse {
    exchange_rate: number;
    quote_amount: number;
}
