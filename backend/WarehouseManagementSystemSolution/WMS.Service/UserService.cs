using WMS.Domain.Interfaces.Repository;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.RequestModels;
using WMS.Domain.ResponseModels;

namespace WMS.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordService _passwordService;
        private readonly IJwtService _jwtService;

        public UserService(IUserRepository userRepository, IPasswordService passwordService, IJwtService jwtService)
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
            _jwtService = jwtService;

        }

        public async Task DeleteUser(int userId)
        {
            await _userRepository.DeleteUser(userId);
        }

        public async Task<User> GetUserById(int userId)
        {
            return await _userRepository.GetUserById(userId);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _userRepository.GetUsers();
        }

        public UserLoginResponse LoginUser(RequestLoginUser request)
        {
            var user = _userRepository.GetUserByEmail(request.Email);
            ArgumentNullException.ThrowIfNull(user, "User doesn't exist.");

            var verifyPassword = _passwordService.VerifyPassword(request.Password, user.Password!);
            if (!verifyPassword)
            {
                throw new Exception("Incorrect credentials.");
            }

            var token = _jwtService.GenerateToken(user);

            return new UserLoginResponse()
            {
                AccessToken = token.AccessToken,
                AccessTokenExpirationDate = token.AccessTokenExpirationDate,
                Role = user.Role
            };
        }

        public async Task<string> RegisterUser(RequestRegisterUser request)
        {
            var checkIfUserExist = _userRepository.GetUserByEmail(request.Email);

            if (checkIfUserExist != null)
            {
                throw new Exception("User with this email already exists.");
            }

            var user = new User()
            {
                Email = request.Email,
                Password = _passwordService.HashPassword(request.Password),
                FirstName = request.FirstName,
                LastName = request.LastName,
            };

            return await _userRepository.RegisterUser(user);
        }
    }
}
