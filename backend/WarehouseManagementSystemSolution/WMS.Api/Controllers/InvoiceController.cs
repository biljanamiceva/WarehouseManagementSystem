using GemBox.Document;
using GemBox.Document.Tables;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;
using WMS.Service;

namespace WMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
            ComponentInfo.SetLicense("FREE-LIMITED-KEY");
        }


        [HttpGet]
        public async Task<IEnumerable<ResponseInvoice>> GetInvoices()
        {
            return await _invoiceService.GetInvoices();
        }

        [HttpPost]
        public async Task<Invoice> AddInvoice(RequestInvoice request)
        {
            return await _invoiceService.AddInvoice(request);
        }

        [HttpPut("{invoiceId}")]
        public async Task<Invoice> UpdateInvoice(int invoiceId, RequestInvoice request)
        {
            return await _invoiceService.UpdateInvoice(invoiceId, request);
        }

        [HttpDelete("{invoiceId}")]
        public async Task DeleteInvoice(int invoiceId)
        {
            await _invoiceService.DeleteInvoice(invoiceId);
        }

        [HttpGet("{invoiceId}")]
        public async Task<Invoice> GetInvoiceById(int invoiceId)
        {
            return await _invoiceService.GetInvoiceById(invoiceId);
        }

        [HttpPut("{invoiceId}/markAs")]
        public async Task<Invoice> MarkInvoiceAs(int invoiceId, RequestMarkInvoiceAs request)
        {
            return await _invoiceService.MarkInvoiceAs(invoiceId, request);
        }

        [HttpPost("generate-invoice")]
        public FileContentResult CreateInvoice(int id)
        {
            var invoice = _invoiceService.GetInvoices().Result.FirstOrDefault(x => x.InvoiceId == id);

            var templatePath = Path.Combine("C:\\Users\\Biljana\\Desktop\\Invoice.docx");
            var document = DocumentModel.Load(templatePath);

            document.Content.Replace("{{CompanyName}}", invoice.CompanyName);
            document.Content.Replace("{{PaymentDueDate}}", invoice.PaymentDueDate.ToString());

            var totalPrice = 0.0;

            var productTable = document.GetChildElements(true)
                .OfType<Table>()
                .FirstOrDefault(t => t.Rows.Any(r => r.Content.ToString().Contains("{{ProductName}}")));

            if (productTable != null)
            {
                var rowTemplate = productTable.Rows.LastOrDefault(r => r.Content.ToString().Contains("{{ProductName}}"));
                if (rowTemplate != null)
                {
                    var rowIndex = productTable.Rows.IndexOf(rowTemplate);

                    // Calculate how many rows can be added before reaching the paragraph limit
                    var remainingRows = 20 - document.GetChildElements(true).OfType<Paragraph>().Count();

                    foreach (var item in invoice.InvoiceOrderProductsI.Take(remainingRows))
                    {
                        var newRow = (TableRow)rowTemplate.Clone(true);
                        newRow.Cells[0].Content.Replace("{{ProductName}}", item.ProductName);
                        newRow.Cells[1].Content.Replace("{{ProductQuantity}}", item.ProductQuantity.ToString());
                        newRow.Cells[2].Content.Replace("{{ProductPrice}}", item.ProductPrice.ToString());

                        productTable.Rows.Insert(rowIndex + 1, newRow);

                        totalPrice += item.ProductQuantity * item.ProductPrice;
                    }

                    productTable.Rows.Remove(rowTemplate);
                }
            }

            document.Content.Replace("{{totalprice}}", totalPrice.ToString("0.00") + " MKD");

            var stream = new MemoryStream();
            document.Save(stream, new PdfSaveOptions());

            return File(stream.ToArray(), new PdfSaveOptions().ContentType, "ExportInvoice.pdf");
        }


    }
}
