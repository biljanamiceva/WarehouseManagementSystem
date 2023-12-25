using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using WMS.Domain.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace WMS.DataContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProducts> OrderProducts { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OrderProducts>().HasKey(e => e.OrderProductId);
            modelBuilder.Entity<OrderProducts>().Property(e => e.OrderProductId).ValueGeneratedOnAdd();

            modelBuilder.Entity<Receipt>()
                .Property(r => r.Amount)
                .HasPrecision(36, 2);

            // M:N relationship between Order and Product
            modelBuilder.Entity<OrderProducts>()
                .HasKey(op => new { op.OrderId, op.ProductId });

            modelBuilder.Entity<OrderProducts>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OrderId);

            modelBuilder.Entity<OrderProducts>()
                .HasOne(op => op.Product)
                .WithMany(p => p.OrderProducts)
                .HasForeignKey(op => op.ProductId);

            //  1:1 relationship between Order and Invoice
            modelBuilder.Entity<Invoice>()
                .HasOne(i => i.Order)
                .WithOne(o => o.Invoice)
                .HasForeignKey<Invoice>(i => i.OrderId);


            // 1:N relationship between Supplier and Receipt
            modelBuilder.Entity<Receipt>()
              .HasOne<Supplier>(r => r.Supplier)
              .WithMany(s => s.Receipts)
              .HasForeignKey(r => r.SupplierId);

            // 1:N relationship between Product and Receipt
            modelBuilder.Entity<Receipt>()
                .HasOne<Product>(r => r.Product)
                .WithMany(p => p.Receipts)
                .HasForeignKey(r => r.ProductId);

            //1:N relationship between Custumer and Invoice
            modelBuilder.Entity<Invoice>()
           .HasOne<Customer>(i => i.Customer)
           .WithMany(c => c.Invoices)
           .HasForeignKey(i => i.CustomerId);
        }
    }
}