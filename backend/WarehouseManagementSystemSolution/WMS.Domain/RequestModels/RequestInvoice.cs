
using WMS.Domain.Enums;
using WMS.Domain.Models;

namespace WMS.Domain.RequestModels
{
    public class RequestInvoice
    {
        public DateTime PaymentDueDate { get; set; }
        public int TotalAmount { get; set; }
        public InvoiceStatus InvoiceStatus { get; set; }
        public int CustomerId { get; set; } 
    }
}
