using Microsoft.EntityFrameworkCore;
using WMS.DataContext;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Models;

namespace WMS.Repository
{
    public class SupplierRepository : ISupplierRepository
    {

        private readonly ApplicationDbContext _context;

        public SupplierRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Supplier> AddSupplier(Supplier Supplier)
        {
            _context.Suppliers.Add(Supplier);
            await _context.SaveChangesAsync();
            return Supplier; 
        }

        public Task<Supplier> DeleteSupplier(int SupplierId)
        {
            throw new NotImplementedException();
        }

        public Task<Supplier> GetSupplierById(int SupplierId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Supplier>> GetSuppliers()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public Task<Supplier> UpdateSupplier(Supplier Supplier)
        {
            throw new NotImplementedException();
        }
    }
}
