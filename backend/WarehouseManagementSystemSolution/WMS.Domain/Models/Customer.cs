using WMS.Domain.Enums;

namespace WMS.Domain.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string? CompanyName { get; set; }
        public string? CustomerPhoneNumber { get; set; }
        public string? CustomerEmail { get; set; }
        public string? CustomerAddress { get; set; }
        public CustomerType CustomerType { get; set; }

        //  1:N relationship with Invoices
        public IEnumerable<Invoice>? Invoices { get; set; }

        //  1:N relationship with Orders
        public IEnumerable<Order>? Orders { get; set; }
    }
}
