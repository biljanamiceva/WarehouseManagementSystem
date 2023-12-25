
using WMS.Domain.Models;

namespace WMS.Domain.Interfaces.Repository
{
    public interface IOrderProductRepository
    {
        Task<OrderProducts> AddOrderProduct(OrderProducts orderProducts);
    }
}
