using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WMS.Domain.Constants;
using WMS.Domain.Interfaces.Service;
using WMS.Domain.Models;
using WMS.Domain.ResponseModels;

namespace WMS.Service
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public AccessTokenGeneratorResponse GenerateToken(User user)
        {
            var issuer = _configuration.GetSection("JWT:Issuer").Value;
            var audience = _configuration.GetSection("JWT:Audience").Value;
            var secretKey = _configuration.GetSection("JWT:SecretKey").Value;
            var expirationTimeInMinutes = _configuration.GetSection("JWT:AccessExpiresInMinutes").Value;

            var claims = new List<Claim>
            {
                new Claim(ClaimValue.ClaimId, user.UserId.ToString()),
                new Claim(ClaimValue.ClaimMail, user.Email),
                new Claim(ClaimValue.ClaimFirstName, user.FirstName),
                new Claim(ClaimValue.ClaimLastName, user.LastName)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = issuer,
                Audience = audience,
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(float.Parse(expirationTimeInMinutes)),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = tokenHandler.CreateToken(tokenDescriptor);
            string token = tokenHandler.WriteToken(securityToken);

            var tokenInfo = new AccessTokenGeneratorResponse
            {
                AccessToken = token,
                AccessTokenExpirationDate = (DateTime)tokenDescriptor.Expires
            };

            return tokenInfo;
        }
    }
}
