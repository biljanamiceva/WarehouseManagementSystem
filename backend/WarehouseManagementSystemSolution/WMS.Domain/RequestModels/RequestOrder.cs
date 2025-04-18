﻿using WMS.Domain.Enums;
using WMS.Domain.Models;

namespace WMS.Domain.RequestModels
{
    public class RequestOrder
    {
        public string OrderTitle { get; set; }
        public List<int> Quantities { get; set; } = new List<int>();
        public List<int> ProductIds { get; set; } = new List<int>();
        public OrderStatus OrderStatus { get; set; }
        public int CustomerId { get; set; }
        //public int ProductId { get; set; }
    }
}
