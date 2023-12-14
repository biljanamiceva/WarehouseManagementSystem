using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Service
{
    public interface IReceiptService
    {
        Task<IEnumerable<ResponseReceipt>> GetReceipts();

        // Get a single receipt by their ID
        Task<Receipt> GetReceiptById(int receiptId);

        // Add a new receipt
        Task<Receipt> AddReceipt(RequestReceipt request);

        // Update an existing receipt
        Task<Receipt> UpdateReceipt(int receiptId, RequestReceipt request);

        // Delete a receipt
        Task DeleteReceipt(int receiptId); 
    }
}
