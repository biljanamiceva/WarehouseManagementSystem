using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WMS.Domain.Models;

namespace WMS.Domain.Interfaces.Repository
{
    public interface ISupplierRepository
    {

        Task<IEnumerable<Supplier>> GetSuppliers();

        Task<Supplier> GetSupplierById(int supplierId);

        Task<Supplier> AddSupplier(Supplier supplier);

        Task<Supplier> UpdateSupplier(Supplier supplier);

        Task DeleteSupplier(int supplierId);
    }
}
