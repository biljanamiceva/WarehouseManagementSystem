

namespace WMS.Domain.Models
{
    public class ProductInvoice
    {
        public int ProductInvoiceId { get; set; }

        public int ProductQuantity { get; set; }
        public decimal ProductAmount { get; set; }
        public int ProductId { get; set; }// Foreign key
        public Product? Product { get; set; }  // Reference to the Product

        public int InvoiceId { get; set; } // Foreign key
        public Invoice? Invoice { get; set; }  // Reference to the Invoice


    }
}
