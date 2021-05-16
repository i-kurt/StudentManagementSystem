using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class TeacherMst
    {
        public TeacherMst()
        {
            TeacherCourses = new HashSet<TeacherCourse>();
        }

        public int Tid { get; set; }
        public string Tname { get; set; }
        public string Course { get; set; }
        public string Education { get; set; }

        public virtual ICollection<TeacherCourse> TeacherCourses { get; set; }
    }
}
