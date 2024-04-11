
namespace WMS.Domain.ResponseModels
{
    public class ResponseSingleInvoice
    {
        public int TotalOrdersInInvoice { get; set; }

        public decimal TotalOrdersAmountInInvoice { get; set; }

        public IEnumerable<ResponseOrderInInvoice> ResponseOrdersInInvoice { get; set;}
    }
}
