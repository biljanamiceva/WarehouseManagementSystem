using WMS.Domain.Enums;


namespace WMS.Domain.ResponseModels
{
    public class ResponseSingleSupplierReceipt
    {
        public int ReceiptId { get; set; }
        public int SupplierId { get; set; }
        public DateTime ReceiptDate { get; set; }
        public int? Quantity { get; set; }
        public decimal Amount { get; set; }
        public string? ProductName { get; set; }
        public ReceiptStatus ReceiptStatus { get; set; }

      
    }
}
