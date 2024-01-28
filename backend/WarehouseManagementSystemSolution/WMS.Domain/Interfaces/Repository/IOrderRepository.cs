using WMS.Domain.Models;
using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Repository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<ResponseOrder>> GetOrders();

        Task<Order> GetOrderById(int orderId);

        Task<Order> AddOrder(Order order);

        Task<Order> UpdateOrder(Order order);

        Task DeleteOrder(int orderId);
    }
}
