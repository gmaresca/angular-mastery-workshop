export interface Customer {
  id: number;
  name: string;
  middleName?: string;
  isVip?: boolean;
  surname: string;
  birthday?: string;
  lifetimeOrderValue?: number;
}
