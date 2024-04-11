using GemBox.Document;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.ResponseModels;
using WMS.Service;

namespace WMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        private readonly IReceiptService _receiptService;

        public DashboardController(IDashboardService dashboardService, IReceiptService receiptService)
        {
            _dashboardService = dashboardService;
            _receiptService = receiptService;

        }

        [HttpGet]
        public async Task<ResponseDashboard> GetDashboard()
        {
            return await _dashboardService.GetDashboard();
        }

    }
}
