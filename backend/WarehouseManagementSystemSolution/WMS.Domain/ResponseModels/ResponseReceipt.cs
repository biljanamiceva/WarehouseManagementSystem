using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WMS.Domain.Enums;

namespace WMS.Domain.ResponseModels
{
    public class ResponseReceipt
    {
        public int ReceiptId { get; set; }
        public DateTime ReceiptDate { get; set; }
        public int? Quantity { get; set; }

        public decimal Amount { get; set; }

        public ReceiptStatus ReceiptStatus { get; set; }
        public int SupplierId { get; set; }
        public string? SupplierName { get; set; }
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
    }
}
