using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using WMS.Domain.Constants;
using WMS.Domain.Interfaces.Service;

namespace WMS.Api.Middleware
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;

        public AuthenticationMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;

        }

        public async Task Invoke(HttpContext context, IJwtService jwtService)
        {
            string token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                AttachAccountToContext(context, token);
            }

            await _next(context);
        }

        private void AttachAccountToContext(HttpContext context, string token)
        {
            var issuer = _configuration.GetSection("JWT:Issuer").Value;
            var audience = _configuration.GetSection("JWT:Audience").Value;
            var secretKey = _configuration.GetSection("JWT:SecretKey").Value;

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(secretKey);

                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);
                context.User = principal;
                Thread.CurrentPrincipal = principal;

                var validToken = validatedToken as JwtSecurityToken;
                if (validToken != null)
                {
                    context.Items[ClaimValue.ClaimId] = validToken.Claims.First(x => x.Type == "user_id").Value;
                    context.Items[ClaimValue.ClaimFirstName] = validToken.Claims.First(x => x.Type == "first_name").Value;
                    context.Items[ClaimValue.ClaimLastName] = validToken.Claims.First(x => x.Type == "last_name").Value;
                    context.Items[ClaimValue.ClaimMail] = validToken.Claims.First(x => x.Type == "email").Value;
                }
            }
            catch
            {
                // do nothing
                // token validation fails, request will remain unauthenticated
            }
        }
    }
}
