using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class StudentCourse
    {
        public int Id { get; set; }
        public int Sid { get; set; }
        public int Cid { get; set; }
        public int Fees { get; set; }
        public int Rem { get; set; }

        public virtual CourseMst CidNavigation { get; set; }
        public virtual StudentMst SidNavigation { get; set; }
    }
}
