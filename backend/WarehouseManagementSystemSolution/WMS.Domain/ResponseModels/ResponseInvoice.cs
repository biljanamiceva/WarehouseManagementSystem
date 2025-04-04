﻿using WMS.Domain.Enums;

namespace WMS.Domain.ResponseModels
{
    public class ResponseInvoice
    {
        public int InvoiceId { get; set; }
        public DateTime PaymentDueDate { get; set; }
        public int TotalAmount { get; set; }
        public InvoiceStatus InvoiceStatus { get; set; }
        public int CustomerId { get; set; }
        public string? CompanyName { get; set; }
        public IEnumerable<InvoiceOrderProductsI> InvoiceOrderProductsI { get; set; }
    }

    public class InvoiceOrderProductsI
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int ProductPrice { get; set; }

        public int ProductQuantity { get; set; }


    }
}
