using Microsoft.EntityFrameworkCore;
using WMS.Domain.Models;

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

        public DbSet<ProductInvoice> ProductInvoices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Receipt>()
                .Property(r => r.Amount)
                .HasPrecision(36, 2);

            modelBuilder.Entity<ProductInvoice>()
              .Property(r => r.ProductAmount)
              .HasPrecision(36, 2);

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


            //  M:N relationship 
            modelBuilder.Entity<ProductInvoice>()
           .HasKey(p => p.ProductInvoiceId);

            modelBuilder.Entity<ProductInvoice>()
                .HasOne<Product>(pi => pi.Product)
                .WithMany(p => p.ProductInvoices)
                .HasForeignKey(pi => pi.ProductId);

            modelBuilder.Entity<ProductInvoice>()
                .HasOne<Invoice>(pi => pi.Invoice)
                .WithMany(i => i.ProductInvoices)
                .HasForeignKey(pi => pi.InvoiceId);
        }
    }
}