using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Service;

namespace WMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            return await _customerService.GetCustomers();
        }

        [HttpPost]
        public async Task<Customer> AddCustomer(RequestCustomer request)
        {
            return await _customerService.AddCustomer(request);
        }

        [HttpPut("{customerId}")]
        public async Task<Customer> UpdateCustomer(int customerId, RequestCustomer request)
        {
            return await _customerService.UpdateCustomer(customerId, request);
        }

        [HttpDelete("{customerId}")]
        public async Task DeleteCustomer(int customerId)
        {
            await _customerService.DeleteCustomer(customerId);
        }

        [HttpGet("{customerId}")]
        public async Task<Customer> GetCustomerById(int customerId)
        {
            return await _customerService.GetCustomerById(customerId);
        }

    }
}
