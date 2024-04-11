using WMS.Domain.Enums;

namespace WMS.Domain.Models
{
    public class Receipt
    {
        public int ReceiptId { get; set; }
        public DateTime ReceiptDate { get; set; }
        public int Quantity { get; set;}

        public int Amount { get; set; }

        public ReceiptStatus ReceiptStatus { get; set; }

        public int SupplierId { get; set; } // Foreign key
        public int ProductId { get; set; } // Foreign key

        public Product? Product { get; set; } // Reference to the Product
        public Supplier? Supplier { get; set; } // Reference to the Supplier

    }
}
