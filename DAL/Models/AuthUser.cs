using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class AuthUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
