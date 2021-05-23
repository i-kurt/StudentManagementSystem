using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Controllers
{
    [Route("[controller]/{action}")]
    public class TokenController : ControllerBase
    {
        IConfiguration Configuration;
        public TokenController(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        [HttpPost]
        public IActionResult GetToken([FromBody] DAL.Models.AuthUser user)
        {
            string secretSection = Configuration.GetSection("AppSettings").GetSection("Secret").Value;

            string token = GenerateToken.Generate(new TokenDescriptor
            {
                Claims = new Claim[]
                    {
                        new Claim("userName", user.UserName),
                        new Claim("password", user.Password),
                        new Claim("email", "email@email.com"),
                        new Claim("country", "Türkiye")
                    },
                ExpiresValue = DateTime.UtcNow.AddMinutes(5),
                Secret = secretSection
            });
            return new JsonResult(new
            {
                Token = token
            });
        }
    }
}
