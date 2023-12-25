

namespace WMS.Domain.Models
{
    public class OrderProducts
    {
        public int OrderProductId { get; set; }

        public int Quantity { get; set; } 

        public int Amount { get; set; } 

        public int ProductId { get; set; }
        public int OrderId { get; set; }

        public Order? Order { get; set; }
        public Product? Product { get; set; }
    }
}
