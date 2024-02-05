using WMS.Domain.Models;
using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Repository
{
    public interface IInvoiceRepository
    {
        Task<IEnumerable<ResponseInvoice>> GetInvoices();

        Task<Invoice> GetInvoiceById(int invoiceId);

        Task<Invoice> AddInvoice(Invoice invoice);

        Task<Invoice> UpdateInvoice(Invoice invoice);

        Task DeleteInvoice(int invoiceId);
    }
}
