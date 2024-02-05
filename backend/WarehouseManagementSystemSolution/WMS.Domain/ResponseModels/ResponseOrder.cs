using WMS.Domain.Enums;

namespace WMS.Domain.ResponseModels
{
    public class ResponseOrder
    {
        public int OrderId { get; set; }

        public int TotalAmount { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public int CustomerId { get; set; }
        public string CompanyName { get; set; }
    }
}
