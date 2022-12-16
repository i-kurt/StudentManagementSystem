using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace DAL.Models
{
    public partial class TeacherCourse
    {
        public TeacherCourse()
        {
            StudentCourses = new HashSet<StudentCourse>();
        }

        public int Id { get; set; }
        public int Tid { get; set; }
        public int Cid { get; set; }

        [JsonIgnore]
        public virtual CourseMst CidNavigation { get; set; }

        [JsonIgnore]
        public virtual TeacherMst TidNavigation { get; set; }

        [JsonIgnore]
        public virtual ICollection<StudentCourse> StudentCourses { get; set; }
    }
}
