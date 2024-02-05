using WMS.Domain.Models;
using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Repository
{
    public interface IReceiptRepository
    {
        Task<IEnumerable<ResponseReceipt>> GetReceipts();

        Task<Receipt> GetReceiptById(int receiptId);

        Task<Receipt> AddReceipt(Receipt receipt);

        Task<Receipt> UpdateReceipt(Receipt receipt);

        Task DeleteReceipt(int receiptId);
    }
}
