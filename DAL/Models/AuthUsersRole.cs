using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class AuthUsersRole
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int UserRolId { get; set; }
    }
}
