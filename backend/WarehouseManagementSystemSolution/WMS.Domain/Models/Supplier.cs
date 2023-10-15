namespace WMS.Domain.Models
{
    public class Supplier
    {
        public int SupplierId { get; set; }
        public string? SupplierFullName { get; set; }

        public string? SupplierPhoneNumber { get; set; }

        public string? SupplierEmail { get; set; }

        public string? SupplierAccountNumber { get; set; }

        public IEnumerable<Receipt>? Receipts { get; set; } // 1:N relationship with Receipt
    }
}
