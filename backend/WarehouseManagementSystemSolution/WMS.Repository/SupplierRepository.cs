using Microsoft.EntityFrameworkCore;
using WMS.DataContext;
using WMS.Domain.Enums;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Models;
using WMS.Domain.ResponseModels;

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

        public async Task<ResponseSingleSupplier> GetSupplierReceipts(int supplierId)
        {
            var supplier = await _context.Suppliers.Include(r => r.Receipts).ThenInclude(r => r.Product).Where(r => r.SupplierId == supplierId).FirstOrDefaultAsync();

            var response = new ResponseSingleSupplier();
            if (supplier == null)
            {
                throw new Exception("exception");
            }
            response.SupplierId = supplier.SupplierId;
            response.SupplierFullName = supplier.SupplierFullName;
            response.SupplierEmail = supplier.SupplierEmail;
            response.SupplierPhoneNumber = supplier.SupplierPhoneNumber;
            response.SupplierAccountNumber = supplier.SupplierAccountNumber;

            response.ResponseSingleSupplierReceipts = supplier.Receipts.Select(receipt => new ResponseSingleSupplierReceipt
            {
                ReceiptId = receipt.ReceiptId,
                SupplierId = receipt.SupplierId,
                ReceiptDate = receipt.ReceiptDate,
                Quantity = receipt.Quantity,
                Amount = receipt.Amount,
                ProductName = receipt.Product?.ProductName,
                ReceiptStatus = receipt.ReceiptStatus,
            }).ToList();

            // Calculate totals
            response.TotalReceipts = supplier.Receipts.Count();
            response.TotalQuantity = supplier.Receipts.Sum(r => r.Quantity);
            response.ToatlAmount = supplier.Receipts.Sum(r => r.Amount);

            // Calculate Not Paid Receipts count and total sum
            var notPaidReceipts = supplier.Receipts.Where(r => r.ReceiptStatus == ReceiptStatus.NotPaid || r.ReceiptStatus == ReceiptStatus.Cancelled || r.ReceiptStatus == ReceiptStatus.Overdue);
            response.NotPaidReceipts = notPaidReceipts.Count();
            response.TotalNotPaidAmount = notPaidReceipts.Sum(r => r.Amount);

           // var cancelledNotPaidOverdueReceipts = supplier.Receipts
            //.Where(r => r.ReceiptStatus == ReceiptStatus.Cancelled ||
              //  r.ReceiptStatus == ReceiptStatus.NotPaid ||
                //r.ReceiptStatus == ReceiptStatus.Overdue);

           // response.SumCancelledNotPaidOverdue = cancelledNotPaidOverdueReceipts.Sum(r => r.Amount);



            return response;
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
