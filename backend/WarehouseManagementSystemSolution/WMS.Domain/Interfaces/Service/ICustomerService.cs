using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Service
{
    public interface ICustomerService
    {
        Task<IEnumerable<Customer>> GetCustomers();

        // Get a single customer by their ID
        Task<Customer> GetCustomerById(int customerId);

        // Add a new customer
        Task<Customer> AddCustomer(RequestCustomer request);

        // Update an existing customer
        Task<Customer> UpdateCustomer(int customerId, RequestCustomer request);

        // Delete a customer
        Task DeleteCustomer(int customerId);
        Task<ResponseSingleCustomer> GetCustomerInvoices(int customerId);
    }
}
