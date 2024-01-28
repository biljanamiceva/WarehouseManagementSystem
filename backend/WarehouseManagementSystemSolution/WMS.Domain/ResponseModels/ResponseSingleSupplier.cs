

namespace WMS.Domain.ResponseModels
{
    public class ResponseSingleSupplier
    {
        public int SupplierId { get; set; }
        public string SupplierFullName { get; set; }

        public string SupplierPhoneNumber { get; set; }

        public string SupplierEmail { get; set; }

        public string SupplierAccountNumber { get; set; }

        public int TotalReceipts { get; set; }

        public int? TotalQuantity { get; set; }

        public decimal ToatlAmount { get; set; }

        public int NotPaidReceipts { get; set; }

        public decimal TotalNotPaidAmount { get; set; }

        public IEnumerable<ResponseSingleSupplierReceipt> ResponseSingleSupplierReceipts { get; set; }
    }
}
