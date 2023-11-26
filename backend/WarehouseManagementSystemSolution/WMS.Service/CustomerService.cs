using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;

namespace WMS.Service
{
    public class CustomerService : ICustomerService
    {

        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public async Task<Customer> AddCustomer(RequestCustomer request)
        {
            var customer = new Customer();
            customer.CompanyName = request.CompanyName;
            customer.CustomerPhoneNumber = request.CustomerPhoneNumber;
            customer.CustomerEmail = request.CustomerEmail;
            customer.CustomerAddress = request.CustomerAddress;
            customer.CustomerType = request.CustomerType;

            return await _customerRepository.AddCustomer(customer);
        }

        public async Task DeleteCustomer(int customerId)
        {
            await _customerRepository.DeleteCustomer(customerId);
        }

        public async Task<Customer> GetCustomerById(int customerId)
        {
            return await _customerRepository.GetCustomerById(customerId);
        }

        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            return await _customerRepository.GetCustomers();
        }

        public async Task<Customer> UpdateCustomer(int customerId, RequestCustomer request)
        {
            var customer = await _customerRepository.GetCustomerById(customerId);

            if (customer == null)
            {
                throw new exception("Customer doesn't exist");
            }

            customer.CompanyName = request.CompanyName;
            customer.CustomerPhoneNumber = request.CustomerPhoneNumber;
            customer.CustomerEmail = request.CustomerEmail;
            customer.CustomerAddress = request.CustomerAddress;
            customer.CustomerType = request.CustomerType;

            return await _customerRepository.UpdateCustomer(customer);
        }
    }
}
