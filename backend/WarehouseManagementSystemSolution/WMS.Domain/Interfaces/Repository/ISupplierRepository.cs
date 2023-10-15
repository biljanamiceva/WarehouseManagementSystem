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

        Task<Supplier> GetSupplierById(int SupplierId);

        Task<Supplier> AddSupplier(Supplier Supplier);

        Task<Supplier> UpdateSupplier(Supplier Supplier);

        Task<Supplier> DeleteSupplier(int SupplierId);
    }
}
