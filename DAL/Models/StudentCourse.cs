using System;
using System.Collections.Generic;

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

        public virtual StudentMst SidNavigation { get; set; }
        public virtual TeacherCourse Tc { get; set; }
    }
}
