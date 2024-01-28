using Microsoft.EntityFrameworkCore;
using System;
using WMS.DataContext;
using WMS.Domain.Enums;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Models;
using WMS.Domain.ResponseModels;

namespace WMS.Repository
{
    public class ReceiptRepository : IReceiptRepository
    {

        private readonly ApplicationDbContext _context;

        public ReceiptRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Receipt> AddReceipt(Receipt receipt)
        {
            _context.Receipts.Add(receipt);
            await _context.SaveChangesAsync();
            return receipt;
        }

        public async Task DeleteReceipt(int receiptId)
        {
            var receipt = await _context.Receipts.SingleOrDefaultAsync(e => e.ReceiptId == receiptId);
            if (receipt != null)
            {
                _context.Receipts.Remove(receipt);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Receipt> GetReceiptById(int receiptId)
        {
            var receipt = await _context.Receipts.SingleOrDefaultAsync(e => e.ReceiptId == receiptId);
            if (receipt == null)
            {
                throw new ArgumentNullException("Entity is null.");
            }
            return receipt;
        }

        public async Task<IEnumerable<ResponseReceipt>> GetReceipts()
        {
            var resultList =await _context.Receipts
             .Include(r => r.Supplier)
             .Include(r => r.Product)
             .Select(receipt => new ResponseReceipt
             {
                 ReceiptId = receipt.ReceiptId,
                 ReceiptDate = receipt.ReceiptDate,
                 ReceiptStatus = receipt.ReceiptStatus,
                 Amount = receipt.Amount,
                 Quantity = receipt.Quantity,
                 SupplierId = receipt.SupplierId,
                 SupplierName = receipt.Supplier != null ? receipt.Supplier.SupplierFullName : null,
                 ProductId = receipt.ProductId,
                 ProductName = receipt.Product != null ? receipt.Product.ProductName : null
             })
             .ToListAsync();

            return resultList;
        }

        public async Task<Receipt> UpdateReceipt(Receipt receipt)
        {
            _context.Entry(receipt).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return receipt;
        }
    }
}
