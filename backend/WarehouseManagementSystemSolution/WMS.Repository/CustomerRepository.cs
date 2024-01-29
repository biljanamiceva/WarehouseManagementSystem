using Microsoft.EntityFrameworkCore;
using WMS.DataContext;
using WMS.Domain.Enums;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Models;
using WMS.Domain.ResponseModels;

namespace WMS.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDbContext _context;

        public CustomerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Customer> AddCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task DeleteCustomer(int customerId)
        {
            var customer = await _context.Customers.SingleOrDefaultAsync(e => e.CustomerId == customerId);
            if (customer != null)
            {
                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Customer> GetCustomerById(int customerId)
        {
            var customer = await _context.Customers.SingleOrDefaultAsync(e => e.CustomerId == customerId);
            if (customer == null)
            {
                throw new ArgumentNullException("Entity is null.");
            }
            return customer;
        }

        public async Task<ResponseSingleCustomer> GetCustomerInvoices(int customerId)
        {
            var customer = await _context.Customers.Include(r => r.Invoices).ThenInclude(r => r.Order).Where(r => r.CustomerId == customerId).FirstOrDefaultAsync();

            var response = new ResponseSingleCustomer();
            if (customer == null)
            {
                throw new Exception("exception");
            }

            response.CustomerId = customer.CustomerId;
            response.CompanyName = customer.CompanyName;
            response.CustomerEmail = customer.CustomerEmail;
            response.CustomerPhoneNumber = customer.CustomerPhoneNumber;
            response.CustomerAddress = customer.CustomerAddress;
            response.CustomerType = customer.CustomerType;

            response.ResponseSingleCustomerInvoices = customer.Invoices.Select(invoice => new ResponseSingleCustomerInvoices
            {
                InvoiceId = invoice.InvoiceId,
                CustomerId = invoice.CustomerId,
                PaymentDueDate = invoice.PaymentDueDate,
                TotalAmount = invoice.TotalAmount,
                InvoiceStatus = invoice.InvoiceStatus,
            }).ToList();

            // Calculate totals
            response.TotalInvoices = customer.Invoices.Count();
            response.AmountSum = customer.Invoices.Sum(r => r.TotalAmount);

            // Calculate Not Paid Receipts count and total sum
            var notPaidInvoices = customer.Invoices.Where(r => r.InvoiceStatus == InvoiceStatus.NotPaid || r.InvoiceStatus == InvoiceStatus.Cancelled || r.InvoiceStatus == InvoiceStatus.Overdue);
            response.NotPaidInvoices = notPaidInvoices.Count();
            response.TotalNotPaidAmountInvoice = notPaidInvoices.Sum(r => r.TotalAmount);


            return response;
        }

        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<Customer> UpdateCustomer(Customer customer)
        {
            _context.Entry(customer).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return customer;
        }
    }
}
