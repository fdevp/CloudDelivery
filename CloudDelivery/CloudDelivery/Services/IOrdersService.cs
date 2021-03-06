﻿using CloudDelivery.Data.Entities;
using CloudDelivery.Models;
using CloudDelivery.Models.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudDelivery.Services
{
    public interface IOrdersService
    {
        /// <summary>
        /// add new order ad
        /// </summary>
        /// <param name="order">order details</param>
        /// <param name="SalePointId">SalePoint which added ad</param>
        /// <returns></returns>
        int AddOrder(Order order, int SalePointId);

        /// <summary>
        /// get order details
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        Order Details(int orderId);


        /// <summary>
        /// 
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        List<Order> List(OrdersListFiltersModel filters);

        /// <summary>
        /// accept order and change status
        /// </summary>
        /// <param name="orderId"></param>
        /// <param name="carrierId">carrier who accepted order</param>
        /// <returns></returns>
        void AcceptOrder(int orderId, int carrierId);

        /// <summary>
        /// set current datetime as final pick up time and change status
        /// </summary>
        /// <param name="orderId"></param>
        void SetPickup(int orderId);

        /// <summary>
        /// set current datetime as final delivery time  and change status
        /// </summary>
        /// <param name="orderId"></param>
        void SetDelivered(int orderId);

        /// <summary>
        /// cancel order by salepoint
        /// </summary>
        /// <param name="orderId"></param>
        void CancelOrder(int orderId);


        /// <summary>
        /// drop accepted order by carrier
        /// </summary>
        /// <param name="orderId"></param>
        void DiscardOrder(int orderId);


        /// <summary>
        /// filter and count orders
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        int Count(OrderCountFiltersModel filters);
    }
}
