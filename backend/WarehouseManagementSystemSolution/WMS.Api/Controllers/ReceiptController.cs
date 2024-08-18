using GemBox.Document;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using WMS.Domain.Enums;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;
using CustomerService = Stripe.CustomerService;

namespace WMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]
    public class ReceiptController : ControllerBase
    {
        private readonly IReceiptService _receiptService;
        private readonly IProductService _productService;
  

        public ReceiptController(IReceiptService receiptService, IProductService productService)
        {
            _receiptService = receiptService;
            _productService = productService;
           
            ComponentInfo.SetLicense("FREE-LIMITED-KEY");

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

        [HttpPut("{receiptId}/markAs")]
        public async Task<Receipt> MarkReceiptAs(int receiptId, RequestMarkReceiptAs request)
        {
            return await _receiptService.MarkReceiptAs(receiptId, request);
        }


        [HttpPost("generate-receipt")]
        public FileContentResult CreateReceipt(int id)
        {
            var receipt = _receiptService.GetReceipts().Result.FirstOrDefault(x => x.ReceiptId == id);


            var templatePath = Path.Combine("C:\\Users\\Biljana\\Desktop\\Receipt.docx");
            var document = DocumentModel.Load(templatePath);

            document.Content.Replace("{{SupplierName}}", receipt.SupplierName);
            document.Content.Replace("{{ProductName}}", receipt.ProductName);
            document.Content.Replace("{{Amount}}", receipt.Amount.ToString());
            document.Content.Replace("{{ReceiptDate}}", receipt.ReceiptDate.ToString());
            document.Content.Replace("{{Quantity}}", receipt.Quantity.ToString());
            document.Content.Replace("{{ProductPrice}}", receipt.ProductPrice.ToString());

            var stream = new MemoryStream();
            document.Save(stream, new PdfSaveOptions());

            return File(stream.ToArray(), new PdfSaveOptions().ContentType, "ExportReceipt.pdf");
        }


        [HttpPut("{receiptId}/create-payment")]
        public async Task<IActionResult> PayReceipt(int receiptId)
        {
            var receipt = await _receiptService.GetReceiptById(receiptId);

            if (receipt == null)
            {
                return NotFound(new { message = "Receipt not found" });
            }

          

           
                receipt.ReceiptStatus = ReceiptStatus.Paid;
                await _receiptService.MarkReceiptAs(receiptId, new RequestMarkReceiptAs { ReceiptStatus = ReceiptStatus.Paid});

              
            
            return Ok(new { message = "Payment successful" });

        }

    }
}

