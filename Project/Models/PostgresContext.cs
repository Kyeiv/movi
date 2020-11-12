using Microsoft.EntityFrameworkCore;

namespace Project.Models
{
    public partial class PostgresContext : DbContext
    {
        public PostgresContext(DbContextOptions<PostgresContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Movie> Movies { get; set; }
        public virtual DbSet<UserInfo> UserInfo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>(entity =>
            {
                entity.HasKey(m => m.MovieId);
                
                entity.HasOne(m => m.UserInfo)
                    .WithMany(u => u.Movies)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasForeignKey(m => m.UserId);

                entity.Property(m => m.Title)
                    .HasMaxLength(100)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(m => m.Genre)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(m => m.Director)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(m => m.Rate);
                entity.Property(m => m.Year);
                entity.Property(m => m.Rated);
                entity.Property(m => m.Released);
                entity.Property(m => m.Writer);
                entity.Property(m => m.Runtime);
                entity.Property(m => m.Actors);
                entity.Property(m => m.Plot);
                entity.Property(m => m.Country);
                entity.Property(m => m.Awards);
                entity.Property(m => m.Metascore);
                entity.Property(m => m.Poster);
                entity.Property(m => m.imdbID);
            });

            modelBuilder.Entity<UserInfo>(entity =>
            {
                entity.HasKey(u => u.UserId);

                entity.Navigation(u => u.Movies)
                    .UsePropertyAccessMode(PropertyAccessMode.Property);

                entity.Property(m => m.CreatedDate);

                entity.Property(m => m.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(m => m.FirstName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(m => m.LastName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(m => m.Password)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(m => m.UserName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}