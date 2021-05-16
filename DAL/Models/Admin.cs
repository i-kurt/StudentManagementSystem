using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class Admin
    {
        public int Aid { get; set; }
        public string Name { get; set; }
        public string LoginName { get; set; }
        public string Password { get; set; }
    }
}
