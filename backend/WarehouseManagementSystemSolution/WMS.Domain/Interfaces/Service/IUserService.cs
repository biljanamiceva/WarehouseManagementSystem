using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;

namespace WMS.Domain.Interfaces.Service
{
    public interface IUserService
    {
        UserLoginResponse LoginUser(RequestLoginUser request);
        Task<string> RegisterUser(RequestRegisterUser request);

        Task<IEnumerable<User>> GetUsers();

        Task<User> GetUserById(int userId);

   
        Task DeleteUser(int userId);
    }
}
