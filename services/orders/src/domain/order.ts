import OrderStatus from './orderStatus'

type Order = {
  id: string;
  status: OrderStatus;
  productList: string[];
}

export default Order
