using WMS.Domain.Enums;

namespace WMS.Domain.Models
{
    public class Order
    {
        public int OrderId { get; set; }


        public int TotalAmount { get; set; }

        public OrderStatus OrderStatus { get; set; }


        // M:N relationship with Product
        public List<OrderProducts> OrderProducts { get; set; } = new List<OrderProducts>();

        // 1:1 relationship with Invoice
        public Invoice? Invoice { get; set; }

    }
}
