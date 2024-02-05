using WMS.Domain.Models;
using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Repository
{
    public interface ISupplierRepository
    {

        Task<IEnumerable<Supplier>> GetSuppliers();

        Task<Supplier> GetSupplierById(int supplierId);

        Task<Supplier> AddSupplier(Supplier supplier);

        Task<Supplier> UpdateSupplier(Supplier supplier);

        Task DeleteSupplier(int supplierId);

        Task <ResponseSingleSupplier> GetSupplierReceipts(int supplierId);
    }
}
