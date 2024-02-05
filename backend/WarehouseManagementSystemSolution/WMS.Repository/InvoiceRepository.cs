using Microsoft.EntityFrameworkCore;
using WMS.DataContext;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Models;
using WMS.Domain.ResponseModels;

namespace WMS.Repository
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly ApplicationDbContext _context;

        public InvoiceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Invoice> AddInvoice(Invoice invoice)
        {
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();
            return invoice;
        }

        public async Task DeleteInvoice(int invoiceId)
        {
            var invoice = await _context.Invoices.SingleOrDefaultAsync(e => e.InvoiceId == invoiceId);
            if (invoice != null)
            {
                _context.Invoices.Remove(invoice);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Invoice> GetInvoiceById(int invoiceId)
        {
            var invoice = await _context.Invoices.SingleOrDefaultAsync(e => e.InvoiceId == invoiceId);
            if (invoice == null)
            {
                throw new ArgumentNullException("Entity is null.");
            }
            return invoice;
        }

        public async Task<IEnumerable<ResponseInvoice>> GetInvoices()
        {
            var resultList = await _context.Invoices
            .Include(r => r.Customer)
            .Select(invoice => new ResponseInvoice
            {
                InvoiceId = invoice.InvoiceId,
                PaymentDueDate = invoice.PaymentDueDate,
                TotalAmount = invoice.TotalAmount,
                InvoiceStatus = invoice.InvoiceStatus,
                CustomerId = invoice.CustomerId,
                CompanyName = invoice.Customer != null ? invoice.Customer.CompanyName : null,

            })
            .ToListAsync();
            return resultList;
        }

        public async Task<Invoice> UpdateInvoice(Invoice invoice)
        {
            _context.Entry(invoice).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return invoice;
        }
    }
}
