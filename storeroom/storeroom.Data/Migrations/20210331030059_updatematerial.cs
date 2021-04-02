using Microsoft.EntityFrameworkCore.Migrations;

namespace storeroom.Data.Migrations
{
    public partial class updatematerial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Materials");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Materials",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
