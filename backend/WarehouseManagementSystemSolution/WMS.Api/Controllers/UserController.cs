using Microsoft.AspNetCore.Authorization;
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
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("/login")]
        public UserLoginResponse LoginUser(RequestLoginUser request)
        {
            return _userService.LoginUser(request);
        }
      
        [HttpPost("/register")]
        [Authorize]
        public async Task<string> RegisterUser(RequestRegisterUser request)
        {
            return await _userService.RegisterUser(request);
        }

        [HttpGet]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _userService.GetUsers();
        }


        [HttpDelete("{userId}")]
        public async Task DeleteUser(int userId)
        {
            await _userService.DeleteUser(userId);

        }
        [HttpGet("{userId}")]
        public async Task<User> GetSupplierById(int userId)
        {
            return await _userService.GetUserById(userId);
        }
    }
}
