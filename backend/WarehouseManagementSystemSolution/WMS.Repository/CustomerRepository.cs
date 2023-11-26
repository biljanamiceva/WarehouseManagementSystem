using Microsoft.EntityFrameworkCore;
using WMS.DataContext;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Models;

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
