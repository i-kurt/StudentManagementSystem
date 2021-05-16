using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class TeacherCourse
    {
        public int Id { get; set; }
        public int Tid { get; set; }
        public int Cid { get; set; }

        public virtual CourseMst CidNavigation { get; set; }
        public virtual TeacherMst TidNavigation { get; set; }
    }
}
