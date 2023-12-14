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
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
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
    }
}
