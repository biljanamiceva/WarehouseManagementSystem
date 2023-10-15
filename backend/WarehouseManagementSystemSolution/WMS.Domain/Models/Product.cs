using WMS.Domain.Enums;

namespace WMS.Domain.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public int? ProductQuantityInStock { get; set; }
        public ProductStatus ProductStatus { get; set; }

        public IEnumerable<Receipt>? Receipts { get; set; } // 1:N relationship with Receipt

        public IEnumerable<ProductInvoice>? ProductInvoices { get; set; } // M:N relationship with Invoices

    }
}
