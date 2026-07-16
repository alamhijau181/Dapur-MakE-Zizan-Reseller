export enum MenuCategory {
  Pastry = "Pastry",
  Pizza = "Pizza",
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  resellerPrice: number;
  description: string;
  image: string;
  specs: string[];
  optionsLabel?: string;
  options?: string[];
  customMessageCost?: number;
  customMessageLabel?: string;
  bulkDiscounts: {
    minQty: number;
    discountPercent: number;
  }[];
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  selectedOption?: string; // e.g. "pisang coklat keju" for Bolen
  customMessage?: string; // custom text message on pizza/sus (+4k)
  useCustomMessage: boolean;
}
