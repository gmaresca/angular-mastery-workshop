export interface Customer {
  id: number;
  name: string;
  surname: string;
  birthday?: string;
  isVip?: boolean;
  lifetimeOrderValue?: number;
  tags?: string[];
  address?: CustomerAddress;
}

export interface CustomerAddress {
  location: string;
  land: string;
  continent: string;
}
