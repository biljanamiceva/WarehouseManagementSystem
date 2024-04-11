
using WMS.Domain.Enums;

namespace WMS.Domain.RequestModels
{
    public class RequestMarkOrderAs
    {
        public int OrderId { get; set; }
        public OrderStatus OrderStatus { get; set; }
    }
}
