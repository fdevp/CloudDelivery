using CloudDelivery.Data.Entities;
using CloudDelivery.Models.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Hubs
{
    public interface INotificationsHub
    {
        void OrderAdded(Order order);

        void OrderCancelled(int orderId);

        void OrderAccepted(int orderId);

        void OrderAccepted(OrderSalepointVM order);

        void OrderPickedUp(int orderId);

        void OrderDelivered(int orderId);
    }
}
