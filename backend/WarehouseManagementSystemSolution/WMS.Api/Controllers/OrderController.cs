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
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet]
        public async Task<IEnumerable<ResponseOrder>> GetInvoices()
        {
            return await _orderService.GetOrders();
        }

        [HttpPost]
        public async Task<int> AddOrder(RequestOrder request)
        {
            return await _orderService.AddOrder(request);
        }

        [HttpPut("{orderId}")]
        public async Task<Order> UpdateInvoice(int orderId, RequestOrder request)
        {
            return await _orderService.UpdateOrder(orderId, request);
        }

        [HttpDelete("{orderId}")]
        public async Task DeleteOrder(int orderId)
        {
            await _orderService.DeleteOrder(orderId);
        }

        [HttpGet("{orderId}")]
        public async Task<Order> GetOrderById(int orderId)
        {
            return await _orderService.GetOrderById(orderId);
        }
    }
}
