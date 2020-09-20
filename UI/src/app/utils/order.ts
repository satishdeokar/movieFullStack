
export interface Order {
    orderId: string;
    productName: string;
    quantity: number;
    amount: number;
    deliveryAddress: string;
    deliveryAgentName: string;
    orderDate: Date;
    expectedDateofDelivery: Date;
    dateofDelivery: Date;
    isComplete:boolean;
  }