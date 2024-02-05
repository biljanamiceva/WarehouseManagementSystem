using WMS.Domain.Enums;

namespace WMS.Domain.RequestModels
{
    public class RequestMarkInvoiceAs
    {
        public int InvoiceId { get; set; }
        public InvoiceStatus InvoiceStatus { get; set; }
    }
}
