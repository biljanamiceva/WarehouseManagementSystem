using WMS.Domain.Enums;

namespace WMS.Domain.Models
{
    public class Invoice
    {

        public int InvoiceId { get; set; }
        public DateTime PaymentDueDate { get; set; }
        public int TotalAmount { get; set; }
        public InvoiceStatus InvoiceStatus { get; set; }
        public int CustomerId { get; set; } // Foreign key

        public Customer? Customer { get; set; }  // Reference to the Product

        public IEnumerable<ProductInvoice>? ProductInvoices { get; set; } // M:N relationship with Products
    }
}
