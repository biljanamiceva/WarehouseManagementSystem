using WMS.Domain.Models;

namespace WMS.Domain.Interfaces.Repository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetOrders();

        Task<Order> GetOrderById(int orderId);

        Task<Order> AddOrder(Order order);

        Task<Order> UpdateOrder(Order order);

        Task DeleteOrder(int orderId);
    }
}
