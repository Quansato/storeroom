using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace storeroom.Data.Migrations
{
    public partial class pn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inputs_Storerooms_StoreroomReceiveId",
                table: "Inputs");

            migrationBuilder.DropForeignKey(
                name: "FK_Outputs_Storerooms_StoreroomId",
                table: "Outputs");

            migrationBuilder.DropIndex(
                name: "IX_Outputs_StoreroomId",
                table: "Outputs");

            migrationBuilder.DropIndex(
                name: "IX_Inputs_StoreroomReceiveId",
                table: "Inputs");

            migrationBuilder.DropColumn(
                name: "StoreroomReceiveId",
                table: "Inputs");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateDocument",
                table: "Outputs",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StoreroomReceiveId",
                table: "Outputs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Outputs_StoreroomReceiveId",
                table: "Outputs",
                column: "StoreroomReceiveId");

            migrationBuilder.CreateIndex(
                name: "IX_Inputs_StoreroomId",
                table: "Inputs",
                column: "StoreroomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inputs_Storerooms_StoreroomId",
                table: "Inputs",
                column: "StoreroomId",
                principalTable: "Storerooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Outputs_Storerooms_StoreroomReceiveId",
                table: "Outputs",
                column: "StoreroomReceiveId",
                principalTable: "Storerooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inputs_Storerooms_StoreroomId",
                table: "Inputs");

            migrationBuilder.DropForeignKey(
                name: "FK_Outputs_Storerooms_StoreroomReceiveId",
                table: "Outputs");

            migrationBuilder.DropIndex(
                name: "IX_Outputs_StoreroomReceiveId",
                table: "Outputs");

            migrationBuilder.DropIndex(
                name: "IX_Inputs_StoreroomId",
                table: "Inputs");

            migrationBuilder.DropColumn(
                name: "DateDocument",
                table: "Outputs");

            migrationBuilder.DropColumn(
                name: "StoreroomReceiveId",
                table: "Outputs");

            migrationBuilder.AddColumn<int>(
                name: "StoreroomReceiveId",
                table: "Inputs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Outputs_StoreroomId",
                table: "Outputs",
                column: "StoreroomId");

            migrationBuilder.CreateIndex(
                name: "IX_Inputs_StoreroomReceiveId",
                table: "Inputs",
                column: "StoreroomReceiveId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inputs_Storerooms_StoreroomReceiveId",
                table: "Inputs",
                column: "StoreroomReceiveId",
                principalTable: "Storerooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Outputs_Storerooms_StoreroomId",
                table: "Outputs",
                column: "StoreroomId",
                principalTable: "Storerooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
