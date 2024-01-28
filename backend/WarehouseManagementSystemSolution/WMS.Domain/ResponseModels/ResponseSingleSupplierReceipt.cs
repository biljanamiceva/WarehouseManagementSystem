using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WMS.Domain.Enums;
using WMS.Domain.Models;

namespace WMS.Domain.ResponseModels
{
    public class ResponseSingleSupplierReceipt
    {
        public int ReceiptId { get; set; }
        public int SupplierId { get; set; }
        public DateTime ReceiptDate { get; set; }
        public int? Quantity { get; set; }
        public decimal Amount { get; set; }
        public string? ProductName { get; set; }
        public ReceiptStatus ReceiptStatus { get; set; }

      
    }
}
