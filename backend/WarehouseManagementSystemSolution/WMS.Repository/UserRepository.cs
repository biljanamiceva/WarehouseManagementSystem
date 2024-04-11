using Microsoft.EntityFrameworkCore;
using WMS.DataContext;
using WMS.Domain.Enums;
using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Models;

namespace WMS.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task DeleteUser(int userId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(e => e.UserId == userId);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public User GetUserByEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == email);
            return user;
        }

        public async Task<User> GetUserById(int userId)
        {
           
            var user = await _context.Users.SingleOrDefaultAsync(e => e.UserId == userId);
            if (user == null)
            {
                throw new ArgumentNullException("Entity is null.");
            }
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<string> RegisterUser(User user)
        {
            if (!_context.Users.Any())
                user.Role = UserRole.Admin.ToString();
            else
                user.Role = UserRole.Standard.ToString();

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return "Success";
        }
    }
}
