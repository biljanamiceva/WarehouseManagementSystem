using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;

namespace WMS.Service
{
    public class InvoiceService : IInvoiceService
    {

        private readonly IInvoiceRepository _invoiceRepository;

        public InvoiceService(IInvoiceRepository invoiceRepository)
        {
            _invoiceRepository = invoiceRepository;
        }

        public async Task<Invoice> AddInvoice(RequestInvoice request)
        {
            var invoice = new Invoice();

            invoice.PaymentDueDate = request.PaymentDueDate;
            invoice.InvoiceStatus = request.InvoiceStatus;
            invoice.CustomerId = request.CustomerId;
            invoice.OrderId = request.OrderId;

            return await _invoiceRepository.AddInvoice(invoice);
        }

        public async Task DeleteInvoice(int invoiceId)
        {
            await _invoiceRepository.DeleteInvoice(invoiceId);
        }

        public async Task<Invoice> GetInvoiceById(int invoiceId)
        {
            return await _invoiceRepository.GetInvoiceById(invoiceId);
        }

        public async Task<IEnumerable<ResponseInvoice>> GetInvoices()
        {
            return await _invoiceRepository.GetInvoices();
        }

        public async Task<Invoice> MarkInvoiceAs(int invoiceId, RequestMarkInvoiceAs request)
        {
            var invoice = await _invoiceRepository.GetInvoiceById(invoiceId);
            if (invoice == null)
            {
                throw new Exception("Receipt doesn't exist");
            }

            invoice.InvoiceStatus = request.InvoiceStatus;

            return await _invoiceRepository.UpdateInvoice(invoice);
        }

        public async Task<Invoice> UpdateInvoice(int invoiceId, RequestInvoice request)
        {
            var invoice = await _invoiceRepository.GetInvoiceById(invoiceId);

            if (invoice == null)
            {
                throw new exception("Invoice doesn't exist");
            }

            invoice.PaymentDueDate = request.PaymentDueDate;
            invoice.InvoiceStatus = request.InvoiceStatus;
            // invoice.CustomerId = request.CustomerId;

            return await _invoiceRepository.UpdateInvoice(invoice);
        }
    }
}