using WMS.Domain.Models;

namespace WMS.Domain.Interfaces.Repository
{
    public interface IUserRepository
    {
        User GetUserByEmail(string email);
        Task<string> RegisterUser(User user);
        Task<User> GetUserById(int userId);

        Task<IEnumerable<User>> GetUsers();
      
        Task DeleteUser(int userId);

    }
}
