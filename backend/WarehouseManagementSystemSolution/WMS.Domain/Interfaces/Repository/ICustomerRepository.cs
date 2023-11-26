using WMS.Domain.Models;

namespace WMS.Domain.Interfaces.Repository
{
    public interface ICustomerRepository
    {

        Task<IEnumerable<Customer>> GetCustomers();

        Task<Customer> GetCustomerById(int customerId);

        Task<Customer> AddCustomer(Customer customer);

        Task<Customer> UpdateCustomer(Customer customer);

        Task DeleteCustomer(int customerId);
    }
}
