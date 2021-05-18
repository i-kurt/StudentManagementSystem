using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public virtual ICollection<TeacherCourse> TeacherCourses { get; set; }
    }
}
