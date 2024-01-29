using WMS.Domain.Enums;

namespace WMS.Domain.ResponseModels
{
    public class ResponseSingleCustomer
    {
        public int CustomerId { get; set; }
        public string? CompanyName { get; set; }
        public string? CustomerPhoneNumber { get; set; }
        public string? CustomerEmail { get; set; }
        public string? CustomerAddress { get; set; }

        public CustomerType CustomerType { get; set; }

        public int TotalInvoices { get; set; }

        public int AmountSum { get; set; }

        public int NotPaidInvoices{ get; set; }

        public decimal TotalNotPaidAmountInvoice { get; set; }


        public IEnumerable<ResponseSingleCustomerInvoices> ResponseSingleCustomerInvoices { get; set; }
    }
}
