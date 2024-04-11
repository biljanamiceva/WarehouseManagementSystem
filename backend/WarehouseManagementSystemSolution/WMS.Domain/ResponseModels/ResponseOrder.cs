using WMS.Domain.Enums;

namespace WMS.Domain.ResponseModels
{
    public class ResponseOrder
    {
      
        public int OrderId { get; set; }

        public string OrderTitle { get; set; }
        public int TotalAmount { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public int CustomerId { get; set; }
        public string CompanyName { get; set; }
        public IEnumerable<OrderDetails> OrderDetails { get; set; } = Enumerable.Empty<OrderDetails>();
    }

    public class OrderDetails
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
    }
}
