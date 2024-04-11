

using WMS.Domain.Models;

namespace WMS.Domain.ResponseModels
{
    public class ResponseSingleInvoiceOrders
    {
        public int InvoiceId { get; set; }
        public IEnumerable<Order> ListOrders { get; set; }
    }
}
