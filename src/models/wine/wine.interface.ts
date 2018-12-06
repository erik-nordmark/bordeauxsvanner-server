export interface IWine {
    name: string;
    year: number;
    country: string;
    district: string;
    producer: string;
    type: string;
    quantity: number;
    before: number;
    from: number;
    comment?: string;
  }