using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;

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
        public async Task<Supplier> AddSupplier(Supplier supplier)
        {
           return await _supplierService.AddSupplier(supplier);
        }

    }
}
