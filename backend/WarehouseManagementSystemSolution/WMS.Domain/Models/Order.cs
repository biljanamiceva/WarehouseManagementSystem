using WMS.Domain.Enums;

namespace WMS.Domain.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public string OrderTitle { get; set; }


        public int TotalAmount { get; set; }

        public OrderStatus OrderStatus { get; set; }   
        public List<OrderProducts> OrderProducts { get; set; } = new List<OrderProducts>();    // M:N relationship with Product  
        public Invoice? Invoice { get; set; }  // 1:1 relationship with Invoice

        public int CustomerId { get; set; } // Foreign key

        public Customer? Customer { get; set; }  // Reference to the Customer

    }
}
