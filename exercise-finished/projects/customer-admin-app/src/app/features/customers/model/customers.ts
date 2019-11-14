export interface Customer {
  id: number;
  name: string;
  middleName?: string;
  isVip?: boolean;
  surname: string;
  birthday?: string;
  lifetimeOrderValue?: number;
  tags?: string[];
  address?: CustomerAddress;
}

export interface CustomerAddress {
  location: string;
  land: string;
  continent: string;
}
