
using Microsoft.EntityFrameworkCore;
using WMS.DataContext;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Models;

namespace WMS.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderRepository(ApplicationDbContext context )
        {
            _context = context;
        }
        public async Task<Order> AddOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task DeleteOrder(int orderId)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(e => e.OrderId == orderId);
            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Order> GetOrderById(int orderId)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(e => e.OrderId == orderId);
            if (order == null)
            {
                throw new ArgumentNullException("Entity is null.");
            }
            return order;
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<Order> UpdateOrder(Order order)
        {
            _context.Entry(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return order;
        }
    }
}
