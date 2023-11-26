using System.ComponentModel.DataAnnotations;
using WMS.Domain.Enums;

namespace WMS.Domain.RequestModels
{
    public class RequestCustomer
    {
        [Required]
        public string? CompanyName { get; set; }
        [Required]
        public string? CustomerPhoneNumber { get; set; }
        [Required]
        public string? CustomerEmail { get; set; }
        [Required]
        public string? CustomerAddress { get; set; }
        [Required]
        public CustomerType CustomerType { get; set; }
    }
}
