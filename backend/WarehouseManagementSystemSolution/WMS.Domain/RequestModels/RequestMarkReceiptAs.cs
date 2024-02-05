using WMS.Domain.Enums;

namespace WMS.Domain.RequestModels
{
    public class RequestMarkReceiptAs
    {
        public int ReceiptId { get; set; }
        public ReceiptStatus ReceiptStatus { get; set; }
    }
}
