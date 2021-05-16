using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace DAL.Models
{
    public partial class StudentManagementSystemContext : DbContext
    {
        public StudentManagementSystemContext()
        {
        }

        public StudentManagementSystemContext(DbContextOptions<StudentManagementSystemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<CourseMst> CourseMsts { get; set; }
        public virtual DbSet<StudentCourse> StudentCourses { get; set; }
        public virtual DbSet<StudentMst> StudentMsts { get; set; }
        public virtual DbSet<TeacherCourse> TeacherCourses { get; set; }
        public virtual DbSet<TeacherMst> TeacherMsts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=StudentManagementSystem;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Turkish_CI_AS");

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasKey(e => e.Aid);

                entity.ToTable("ADMIN");

                entity.Property(e => e.Aid).HasColumnName("AID");

                entity.Property(e => e.LoginName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<CourseMst>(entity =>
            {
                entity.HasKey(e => e.Cid);

                entity.ToTable("CourseMst");

                entity.Property(e => e.Cid).HasColumnName("CID");

                entity.Property(e => e.Cname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("CName");
            });

            modelBuilder.Entity<StudentCourse>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Fees).HasColumnName("FEES");

                entity.Property(e => e.Rem).HasColumnName("REM");

                entity.Property(e => e.Sid).HasColumnName("SID");

                entity.Property(e => e.Tcid).HasColumnName("TCID");

                entity.HasOne(d => d.SidNavigation)
                    .WithMany(p => p.StudentCourses)
                    .HasForeignKey(d => d.Sid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentCourses_StudentMst");

                entity.HasOne(d => d.Tc)
                    .WithMany(p => p.StudentCourses)
                    .HasForeignKey(d => d.Tcid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentCourses_TeacherCourses");
            });

            modelBuilder.Entity<StudentMst>(entity =>
            {
                entity.HasKey(e => e.Sid);

                entity.ToTable("StudentMst");

                entity.Property(e => e.Sid).HasColumnName("SID");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.ContactNo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TeacherCourse>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cid).HasColumnName("CID");

                entity.Property(e => e.Tid).HasColumnName("TID");

                entity.HasOne(d => d.CidNavigation)
                    .WithMany(p => p.TeacherCourses)
                    .HasForeignKey(d => d.Cid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TeacherCourses_CourseMst");

                entity.HasOne(d => d.TidNavigation)
                    .WithMany(p => p.TeacherCourses)
                    .HasForeignKey(d => d.Tid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TeacherCourses_TeacherMst");
            });

            modelBuilder.Entity<TeacherMst>(entity =>
            {
                entity.HasKey(e => e.Tid);

                entity.ToTable("TeacherMst");

                entity.Property(e => e.Tid).HasColumnName("TID");

                entity.Property(e => e.Education)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Tname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("TName");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
