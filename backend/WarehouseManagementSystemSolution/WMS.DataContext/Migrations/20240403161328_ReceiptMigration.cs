using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WMS.DataContext.Migrations
{
    /// <inheritdoc />
    public partial class ReceiptMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Amount",
                table: "Receipts",
                type: "int",
                precision: 36,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(36,2)",
                oldPrecision: 36,
                oldScale: 2);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Receipts",
                type: "decimal(36,2)",
                precision: 36,
                scale: 2,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldPrecision: 36,
                oldScale: 2);
        }
    }
}
