using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;
using WMS.Service;

namespace WMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        private readonly IReceiptService _receiptService;

        public ReceiptController(IReceiptService receiptService)
        {
            _receiptService = receiptService;
        }

        [HttpGet]
        public async Task<IEnumerable<ResponseReceipt>> GetReceipts()
        {
            return await _receiptService.GetReceipts();
        }

        [HttpPost]
        public async Task<Receipt> AddReceipt(RequestReceipt request)
        {
            return await _receiptService.AddReceipt(request);
        }

        [HttpPut("{receiptId}")]
        public async Task<Receipt> UpdateReceipt(int receiptId, RequestReceipt request)
        {
            return await _receiptService.UpdateReceipt(receiptId, request);
        }

        [HttpDelete("{receiptId}")]
        public async Task DeleteReceipt(int receiptId)
        {
            await _receiptService.DeleteReceipt(receiptId);
        }

        [HttpGet("{receiptId}")]
        public async Task<Receipt> GetReceiptById(int receiptId)
        {
            return await _receiptService.GetReceiptById(receiptId);
        }
    }
}
