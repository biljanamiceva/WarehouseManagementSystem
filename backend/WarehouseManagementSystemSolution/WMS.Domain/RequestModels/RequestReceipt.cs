using System.ComponentModel.DataAnnotations;
using WMS.Domain.Enums;

namespace WMS.Domain.RequestModels
{
    public class RequestReceipt
    {
        [Required]
        public DateTime ReceiptDate { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public decimal Amount { get; set; }
        public int SupplierId { get; set; }
        public int ProductId { get; set; } 
        [Required]
        public ReceiptStatus ReceiptStatus { get; set; }
    }
}
