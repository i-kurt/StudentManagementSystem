using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace DAL.Models
{
    public partial class StudentCourse
    {
        public int Id { get; set; }
        public int Sid { get; set; }
        public int Tcid { get; set; }
        public int Fees { get; set; }
        public int Rem { get; set; }

        [JsonIgnore]
        public virtual StudentMst SidNavigation { get; set; }

        [JsonIgnore]
        public virtual TeacherCourse Tc { get; set; }
    }
}
