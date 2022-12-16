using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
            try
            {
                bool blVerify = false;
                List<string> lstRoles = null;

                using (var db = new DAL.Models.StudentManagementSystemContext())
                {
                    var aUser = db.AuthUsers.Where(u => u.Password == user.Password && u.UserName == user.UserName).FirstOrDefault();
                    if (aUser != null)
                    {
                        lstRoles = (from uRol in db.AuthUsersRoles.Where(ur => ur.UserId == aUser.Id)
                                    from rNames in db.AuthRoles.Where(r => uRol.UserRolId == r.Id)
                                    select rNames.RolName).ToList();
                        blVerify = true;
                    }
                }

                if (blVerify)
                {
                    string secretSection = Configuration.GetSection("AppSettings").GetSection("Secret").Value;

                    List<Claim> lstClaims = new List<Claim>()
                    {
                        new Claim("userName", user.UserName),
                        new Claim("password", user.Password),
                        new Claim("email", "email@email.com"),
                        new Claim("country", "Türkiye")
                    };

                    for (int i = 0; i < lstRoles.Count; i++)
                    {
                        lstClaims.Add(new Claim(ClaimTypes.Role, lstRoles[i]));
                    }

                    string token = GenerateToken.Generate(new TokenDescriptor
                    {
                        Claims = lstClaims.ToArray(),
                        ExpiresValue = DateTime.UtcNow.AddMinutes(1),
                        Secret = secretSection
                    });

                    lstRoles.Clear();
                    lstClaims.Clear();

                    return new ObjectResult(new { Value = token, Err = "" });
                }
                else
                    return new ObjectResult(new { Value = "", Err = "Hatalı kullanıcı adı veya şifre!" });
            }
            catch (Exception ex)
            {
                return new ObjectResult(new { Value = "", Err = "Hata! " + ex.Message });
            }
        }
    }
}
