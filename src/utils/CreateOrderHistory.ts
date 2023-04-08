import { Order } from "../model/Order";

export default function createOrderHistory(orderHistory: Order[]) {
  const res = [];
  for (let fullOrder of orderHistory) {
    for (let item of fullOrder.orderItemList) {
      res.push({ ...item, status: fullOrder.status, message: fullOrder.message, createdAt: fullOrder.createdAt });
    }
    console.log(
      new Intl.DateTimeFormat('en-US',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        .format(new Date(fullOrder.createdAt))
    )
  }
  return res;
};