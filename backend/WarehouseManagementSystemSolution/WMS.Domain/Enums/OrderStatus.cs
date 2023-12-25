using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WMS.Domain.Enums
{
    public enum OrderStatus
    {
        Processing = 1,
        Shipped = 2,
        Delivered = 3,
        PartiallyShipped = 4,

    }
}
