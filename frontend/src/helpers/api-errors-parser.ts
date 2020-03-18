import { AxiosResponse } from "axios";
import { Nullable } from "@/custom-types";

interface ErrorInterface {
  id: number;
  field: string;
  message: string;
}

interface ResponseErrors {
  [field: string]: string[];
}

export class ApiErrorsParser {
  private title: Nullable<string> = null;
  private list: ErrorInterface[] = [];

  constructor(private response?: AxiosResponse) {
    this.parseResponse();
  }

  public static create(response?: AxiosResponse): ApiErrorsParser {
    return new ApiErrorsParser(response);
  }

  public reset(): void {
    this.title = null;
    this.list = [];
  }

  public update(response?: AxiosResponse) {
    this.reset();
    this.response = response;
    this.parseResponse();
    return this;
  }

  public count(): number {
    return this.list.length;
  }

  public all(): ErrorInterface[] {
    return this.list;
  }

  public first(field?: string): Nullable<string> {
    let item;
    if (!field) {
      item = this.list.length ? this.list[0] : null;
    } else {
      item = this.list.find(e => e.field === field);
    }
    return item ? item.message : null;
  }

  public get(field: string): string[] {
    return this.list
      .filter(item => item.field === field)
      .map(item => item.message);
  }

  public has(field?: string): boolean {
    if (!field) {
      return this.count() > 0;
    }
    return this.list.filter(item => item.field === field).length > 0;
  }

  private parseResponse(): void {
    this.reset();
    if (!this.response) {
      return;
    }
    if (this.response.status === 422) {
      const errors: ResponseErrors = this.response.data.errors;
      this.title = this.response.data.message;
      for (const key in errors) {
        for (const error of errors[key]) {
          this.list.push({
            id: this.hashCode(`${key}-${error}`),
            field: key,
            message: error
          });
        }
      }
    }
  }

  private hashCode(text: string): number {
    let hash = 0;
    if (text.length === 0) {
      return hash;
    }
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      // tslint:disable-next-line:no-bitwise
      hash = (hash << 5) - hash + char;
      // tslint:disable-next-line:no-bitwise
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
}
