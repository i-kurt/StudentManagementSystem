using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class CourseMst
    {
        public CourseMst()
        {
            TeacherCourses = new HashSet<TeacherCourse>();
        }

        public int Cid { get; set; }
        public string Cname { get; set; }
        public int Fees { get; set; }
        public int Duration { get; set; }

        public virtual ICollection<TeacherCourse> TeacherCourses { get; set; }
    }
}
