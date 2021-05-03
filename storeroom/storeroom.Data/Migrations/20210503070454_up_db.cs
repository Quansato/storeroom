using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace storeroom.Data.Migrations
{
    public partial class up_db : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseProposals_AppUsers_ApproverId",
                table: "PurchaseProposals");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "PurchaseProposals",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<Guid>(
                name: "ApproverId",
                table: "PurchaseProposals",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseProposals_AppUsers_ApproverId",
                table: "PurchaseProposals",
                column: "ApproverId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseProposals_AppUsers_ApproverId",
                table: "PurchaseProposals");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "PurchaseProposals",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 0);

            migrationBuilder.AlterColumn<Guid>(
                name: "ApproverId",
                table: "PurchaseProposals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseProposals_AppUsers_ApproverId",
                table: "PurchaseProposals",
                column: "ApproverId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
