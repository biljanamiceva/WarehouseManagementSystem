using WMS.Domain.Enums;
using WMS.Domain.Models;

namespace WMS.Domain.RequestModels
{
    public class RequestOrder
    {
        public List<int> Quantities { get; set; } = new List<int>();
        public List<int> ProductIds { get; set; } = new List<int>();
        public OrderStatus OrderStatus { get; set; }
    }
}
