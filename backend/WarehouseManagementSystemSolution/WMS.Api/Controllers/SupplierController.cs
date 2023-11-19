using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;

namespace WMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }
        [HttpGet]

        public async Task<IEnumerable<Supplier>> GetSuppliers()
        {
            return await _supplierService.GetSuppliers();
        }


        [HttpPost]
        public async Task<Supplier> AddSupplier(RequestSupplier request)
        {
           return await _supplierService.AddSupplier(request);
        }

        [HttpPut("{supplierId}")]
        public async Task<Supplier> UpdateSupplier(int supplierId, RequestSupplier request)
        {
               return await _supplierService.UpdateSupplier(supplierId, request);
        }

        [HttpDelete("{supplierId}")]
        public async Task DeleteSupplier(int supplierId)
        {
           await _supplierService.DeleteSupplier(supplierId);

        }
        [HttpGet("{supplierId}")]
        public async Task<Supplier> GetSupplierById(int supplierId)
        {
            return await _supplierService.GetSupplierById(supplierId);
        }

    }
}
