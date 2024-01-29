
using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Service
{
    public interface IInvoiceService
    {
        Task<IEnumerable<ResponseInvoice>> GetInvoices();

        // Get a single invoice by their ID
        Task<Invoice> GetInvoiceById(int invoiceId);

        // Add a new invoice
        Task<Invoice> AddInvoice(RequestInvoice request);

        // Update an existing invoice
        Task<Invoice> UpdateInvoice(int invoiceId, RequestInvoice request);

        // Delete a invoice
        Task DeleteInvoice(int invoiceId);

        //Mark as paid invoice
        Task<Invoice> MarkInvoiceAs(int invoiceId, RequestMarkInvoiceAs request);
    }
}
