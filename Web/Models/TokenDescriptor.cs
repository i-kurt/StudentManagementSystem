using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Web.Models
{
    public class AppSettings
    {
        public string Secret { get; set; }
    }

    public class TokenDescriptor
    {
        public Claim[] Claims { get; set; }
        public string Secret { get; set; }
        public DateTime ExpiresValue { get; set; }
    }

    public static class GenerateToken
    {
        public static string Generate(TokenDescriptor descriptor)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(descriptor.Claims),
                Expires = descriptor.ExpiresValue,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(descriptor.Secret)), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
