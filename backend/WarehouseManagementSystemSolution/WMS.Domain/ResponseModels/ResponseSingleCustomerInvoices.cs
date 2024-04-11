using WMS.Domain.Enums;

namespace WMS.Domain.ResponseModels
{
    public class ResponseSingleCustomerInvoices
    {
        public int InvoiceId { get; set; }
        public int CustomerId { get; set; }
        public DateTime PaymentDueDate { get; set; }
        public int TotalAmount { get; set; }
        public InvoiceStatus InvoiceStatus { get; set; }

        public IEnumerable<InvoiceOrderProducts> InvoiceOrderProducts { get; set; }
    }

    public class InvoiceOrderProducts
    {
        public int ProductId { get; set;}   
        public string ProductName { get; set; }
        public int ProductPrice { get; set; }

        public int ProductQuantity { get; set; }

        
    }
}
