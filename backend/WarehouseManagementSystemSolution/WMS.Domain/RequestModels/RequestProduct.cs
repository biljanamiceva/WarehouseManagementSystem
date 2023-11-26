using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WMS.Domain.Enums;

namespace WMS.Domain.RequestModels
{
    public class RequestProduct
    {
        public string? ProductName { get; set; }
        public int? ProductQuantityInStock { get; set; }
        public ProductStatus ProductStatus { get; set; }
    }
}
