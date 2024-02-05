using System.ComponentModel.DataAnnotations;

namespace WMS.Domain.RequestModels
{
    public class RequestSupplier
    {
        [Required]
        public string? SupplierFullName { get; set; }
        [Required]
        public string? SupplierPhoneNumber { get; set; }
        [Required]
        public string? SupplierEmail { get; set; }
        [Required]
        public string? SupplierAccountNumber { get; set; }
    }
}
