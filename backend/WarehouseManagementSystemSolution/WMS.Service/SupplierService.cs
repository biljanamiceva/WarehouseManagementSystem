using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;

namespace WMS.Service
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;

        public SupplierService(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<Supplier> AddSupplier(Supplier Supplier)
        {
            return await _supplierRepository.AddSupplier(Supplier);
        }

        public Task<Supplier> DeleteSupplier(Supplier Supplier)
        {
            throw new NotImplementedException();
        }

        public Task<Supplier> GetSupplierById(int SupplierId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Supplier>> GetSuppliers()
        {
            return await _supplierRepository.GetSuppliers();
        }

        public Task<Supplier> UpdateSupplier(Supplier Supplier)
        {
            throw new NotImplementedException();
        }
    }
}
