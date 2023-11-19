using System;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;

namespace WMS.Service
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;

        public SupplierService(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<Supplier> AddSupplier(RequestSupplier request)
        {
            var supplier = new Supplier();
            supplier.SupplierFullName = request.SupplierFullName;
            supplier.SupplierEmail = request.SupplierEmail;
            supplier.SupplierPhoneNumber = request.SupplierPhoneNumber;
            supplier.SupplierAccountNumber = request.SupplierAccountNumber;
          
            return await _supplierRepository.AddSupplier(supplier);
        }

        public async Task DeleteSupplier(int SupplierId)
        {
           await _supplierRepository.DeleteSupplier(SupplierId);
        }

        public async Task<Supplier> GetSupplierById(int supplierId)
        {
            return await _supplierRepository.GetSupplierById(supplierId);
        }

        public async Task<IEnumerable<Supplier>> GetSuppliers()
        {
            return await _supplierRepository.GetSuppliers();
        }

        public async Task<Supplier> UpdateSupplier(int supplierId, RequestSupplier request)
        {
            var supplier = await _supplierRepository.GetSupplierById(supplierId);

            if (supplier == null) 
            {
                throw new exception("Supplier doesn't exist");
            }
               

            supplier.SupplierFullName = request.SupplierFullName;
            supplier.SupplierEmail = request.SupplierEmail;
            supplier.SupplierPhoneNumber = request.SupplierPhoneNumber;
            supplier.SupplierAccountNumber = request.SupplierAccountNumber;

            return await _supplierRepository.UpdateSupplier(supplier);
        }
    }
}
