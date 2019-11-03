export interface Customer {
  id: number;
  name: string;
  isVip?: boolean;
  surname: string;
  orders?: number [];
}
