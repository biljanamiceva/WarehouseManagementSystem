

using WMS.Domain.Models;

namespace WMS.Domain.Interfaces.Service
{
    public interface ISupplierService
    {
        // Get a list of all suppliers
        Task<IEnumerable<Supplier>> GetSuppliers();

        // Get a single supplier by their ID
        Task<Supplier> GetSupplierById(int SupplierId);

        // Add a new supplier
        Task<Supplier> AddSupplier(Supplier Supplier);

        // Update an existing supplier
        Task<Supplier> UpdateSupplier(Supplier Supplier);

        // Delete a supplier
        Task<Supplier> DeleteSupplier(Supplier Supplier);
    }
}
