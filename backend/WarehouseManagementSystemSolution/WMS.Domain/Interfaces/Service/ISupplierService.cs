

using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Service
{
    public interface ISupplierService
    {
        // Get a list of all suppliers
        Task<IEnumerable<Supplier>> GetSuppliers();

        // Get a single supplier by their ID
        Task<Supplier> GetSupplierById(int supplierId);

        // Add a new supplier
        Task<Supplier> AddSupplier(RequestSupplier request);

        // Update an existing supplier
        Task<Supplier> UpdateSupplier(int supplierId, RequestSupplier request);

        // Delete a supplier
        Task DeleteSupplier(int supplierId);

        Task<ResponseSingleSupplier> GetSupplierReceipts(int supplierId);
    }
}
