using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [ApiController]
    [Route("[controller]/{action}/{id?}")]
    public class TeacherController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetTeachers()
        {
            List<TeacherMst> lst = new List<TeacherMst>();
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    lst = db.TeacherMsts.ToList();
                }
                var ret = new ObjectResult(new { Value = lst, Err = "" });
                return ret;
            }
            catch (System.Exception ex)
            {
                var ret = new ObjectResult(new { Value = lst, Err = "Bir hata oluştu! " + ex.Message });
                return ret;
            }
        }

        [HttpPost]
        public IActionResult DeleteTeacher([FromBody] int TID)
        {
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    var c = db.TeacherMsts.Where(cu => cu.Tid == TID).FirstOrDefault();
                    if (c != null)
                    {
                        db.TeacherMsts.Remove(c);
                        db.SaveChanges();
                        return Ok();
                    }
                    else
                    {
                        var ret = new ObjectResult(new { Value = 0, Err = "Teacher couldnt found!" });
                        return ret;
                    }
                }
            }
            catch (System.Exception ex)
            {
                if (ex.InnerException != null && ex.InnerException.Message.ToLowerInvariant().Contains("reference constraint"))
                {
                    var ret = new ObjectResult(new { Value = 0, Err = "Error! This teacher is referenced to courses!" });
                    return ret;
                }
                else
                {
                    var ret = new ObjectResult(new { Value = 0, Err = "Error! " + ex.Message });
                    return ret;
                }
            }
        }

        [HttpPost]
        public IActionResult SaveTeacher([FromBody] TeacherMst t)
        {
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    db.TeacherMsts.Add(t);
                    db.SaveChanges();
                }
                var ret = new ObjectResult(new { Value = 0, Err = "" });
                return ret;
            }
            catch (System.Exception ex)
            {
                var ret = new ObjectResult(new { Value = 0, Err = "Error! " + ex.Message });
                return ret;
            }
        }

        [HttpGet]
        public IActionResult GetCoursesExcept(int TID)
        {
            List<CourseMst> lst = new List<CourseMst>();
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    var teacherCourses = db.TeacherCourses.Where(tc => tc.Tid == TID).Select(tc => tc.Cid).Distinct().ToList();
                    lst = db.CourseMsts.Where(c => !teacherCourses.Contains(c.Cid)).ToList();
                    teacherCourses.Clear();
                    teacherCourses = null;
                }
                var ret = new ObjectResult(new { Value = lst, Err = "" });
                return ret;
            }
            catch (System.Exception ex)
            {
                var ret = new ObjectResult(new { Value = lst, Err = "Bir hata oluştu! " + ex.Message });
                return ret;
            }
        }

        [HttpGet]
        public IActionResult GetTeacherCourses(int TID)
        {
            List<CourseMst> lst = new List<CourseMst>();
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    var teacherCourses = db.TeacherCourses.Where(tc => tc.Tid == TID).Select(tc => tc.Cid).Distinct().ToList();
                    lst = db.CourseMsts.Where(c => teacherCourses.Contains(c.Cid)).ToList();
                    teacherCourses.Clear();
                    teacherCourses = null;
                }
                var ret = new ObjectResult(new { Value = lst, Err = "" });
                return ret;
            }
            catch (System.Exception ex)
            {
                var ret = new ObjectResult(new { Value = lst, Err = "Bir hata oluştu! " + ex.Message });
                return ret;
            }
        }

        [HttpPost]
        public IActionResult AddCourse([FromBody] TeacherCourse tc)
        {
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    db.TeacherCourses.Add(tc);
                    db.SaveChanges();
                }
                var ret = new ObjectResult(new { Value = 0, Err = "" });
                return ret;
            }
            catch (System.Exception ex)
            {
                var ret = new ObjectResult(new { Value = 0, Err = "Error! " + ex.Message });
                return ret;
            }
        }

        [HttpPost]
        public IActionResult DeleteCourse([FromBody] TeacherCourse tc)
        {
            try
            {
                using (StudentManagementSystemContext db = new StudentManagementSystemContext())
                {
                    var lst = db.TeacherCourses.Where(d => d.Tid == tc.Tid && d.Cid == tc.Cid).ToList();
                    db.TeacherCourses.RemoveRange(lst.ToArray());
                    db.SaveChanges();
                    lst.Clear();
                    lst = null;
                }
                var ret = new ObjectResult(new { Value = 0, Err = "" });
                return ret;
            }
            catch (System.Exception ex)
            {
                var ret = new ObjectResult(new { Value = 0, Err = "Error! " + ex.Message });
                return ret;
            }
        }
    }
}
