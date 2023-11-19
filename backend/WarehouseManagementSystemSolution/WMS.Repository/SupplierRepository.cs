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

        public async Task<Supplier> AddSupplier(Supplier supplier)
        {
            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();
            return supplier; 
        }

        public async Task DeleteSupplier(int supplierId)
        {
            var supplier = await _context.Suppliers.SingleOrDefaultAsync(e => e.SupplierId == supplierId);
            if (supplier != null)
            {
                _context.Suppliers.Remove(supplier);
                await _context.SaveChangesAsync();
            }
          
        }

        public async Task<Supplier> GetSupplierById(int supplierId)
        {
            var supplier = await _context.Suppliers.SingleOrDefaultAsync(e => e.SupplierId == supplierId);
            if (supplier == null)
            {
                throw new ArgumentNullException("Entity is null.");
            }
     
            return supplier;
        }

        public async Task<IEnumerable<Supplier>> GetSuppliers()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<Supplier> UpdateSupplier(Supplier supplier)
        {
            _context.Entry(supplier).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return supplier; 
        }
    }
}
