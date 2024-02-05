using Microsoft.EntityFrameworkCore;
using WMS.DataContext;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Models;

namespace WMS.Repository
{
    public class OrderProductRepository : IOrderProductRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<OrderProducts> AddOrderProduct(OrderProducts orderProducts)
        {
            _context.OrderProducts.Add(orderProducts);
            await _context.SaveChangesAsync();
            return orderProducts;
        }
    }
}
