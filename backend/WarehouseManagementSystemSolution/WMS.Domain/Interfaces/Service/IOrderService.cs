using WMS.Domain.Models;
using WMS.Domain.RequestModels;

namespace WMS.Domain.Interfaces.Service
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetOrders();

        // Get a single order by their ID
        Task<Order> GetOrderById(int orderId);

        // Add a new order
        Task<int> AddOrder(RequestOrder request);

        // Update an existing order
        Task<Order> UpdateOrder(int orderId, RequestOrder request);

        // Delete a order
        Task DeleteOrder(int orderId);
    }
}
