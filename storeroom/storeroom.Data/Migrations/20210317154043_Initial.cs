using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace storeroom.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MaterialGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    QRCode = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Storerooms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoreroomCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DisplayName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Area = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Storerooms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Supliers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MoreInfo = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    ContractDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supliers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Units",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Units", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Inputs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InputCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DeliveryUnit = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    StoreroomId = table.Column<int>(type: "int", nullable: false),
                    Shipper = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DateInput = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inputs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inputs_Storerooms_StoreroomId",
                        column: x => x.StoreroomId,
                        principalTable: "Storerooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Outputs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OutputCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Recipient = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    StoreroomId = table.Column<int>(type: "int", nullable: false),
                    NameRecipient = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DateOutput = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Outputs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Outputs_Storerooms_StoreroomId",
                        column: x => x.StoreroomId,
                        principalTable: "Storerooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseProposals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    StoreroomId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseProposals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseProposals_Storerooms_StoreroomId",
                        column: x => x.StoreroomId,
                        principalTable: "Storerooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transfers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransferCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Receipient = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    StoreroomId = table.Column<int>(type: "int", nullable: false),
                    StoreroomNewId = table.Column<int>(type: "int", nullable: false),
                    DateTransfer = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Desciption = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transfers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transfers_Storerooms_StoreroomNewId",
                        column: x => x.StoreroomNewId,
                        principalTable: "Storerooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    StoreroomId = table.Column<int>(type: "int", nullable: false),
                    NameOfOrder = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    SuplierId = table.Column<int>(type: "int", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseOrders_Storerooms_StoreroomId",
                        column: x => x.StoreroomId,
                        principalTable: "Storerooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseOrders_Supliers_SuplierId",
                        column: x => x.SuplierId,
                        principalTable: "Supliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Materials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    MaterialCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UnitId = table.Column<int>(type: "int", nullable: false),
                    UnitOrderId = table.Column<int>(type: "int", nullable: false),
                    MaterialGroupId = table.Column<int>(type: "int", nullable: false),
                    CountryId = table.Column<int>(type: "int", nullable: false),
                    BrandId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false, defaultValue: 0m),
                    Status = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    Img = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    YearManufacture = table.Column<int>(type: "int", nullable: false),
                    ExperyDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Specification = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QRCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materials", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Materials_Brands_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Materials_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Materials_MaterialGroups_MaterialGroupId",
                        column: x => x.MaterialGroupId,
                        principalTable: "MaterialGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Materials_Units_UnitOrderId",
                        column: x => x.UnitOrderId,
                        principalTable: "Units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MaterialInputs",
                columns: table => new
                {
                    InputId = table.Column<int>(type: "int", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialInputs", x => new { x.InputId, x.MaterialId });
                    table.ForeignKey(
                        name: "FK_MaterialInputs_Inputs_InputId",
                        column: x => x.InputId,
                        principalTable: "Inputs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialInputs_Materials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MaterialOutputs",
                columns: table => new
                {
                    OutputId = table.Column<int>(type: "int", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialOutputs", x => new { x.OutputId, x.MaterialId });
                    table.ForeignKey(
                        name: "FK_MaterialOutputs_Materials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialOutputs_Outputs_OutputId",
                        column: x => x.OutputId,
                        principalTable: "Outputs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MaterialPurchaseOrders",
                columns: table => new
                {
                    PurchaseOrderId = table.Column<int>(type: "int", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialPurchaseOrders", x => new { x.PurchaseOrderId, x.MaterialId });
                    table.ForeignKey(
                        name: "FK_MaterialPurchaseOrders_Materials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialPurchaseOrders_PurchaseOrders_PurchaseOrderId",
                        column: x => x.PurchaseOrderId,
                        principalTable: "PurchaseOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MaterialPurchaseProposals",
                columns: table => new
                {
                    PurchaseProposalId = table.Column<int>(type: "int", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialPurchaseProposals", x => new { x.PurchaseProposalId, x.MaterialId });
                    table.ForeignKey(
                        name: "FK_MaterialPurchaseProposals_Materials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialPurchaseProposals_PurchaseProposals_PurchaseProposalId",
                        column: x => x.PurchaseProposalId,
                        principalTable: "PurchaseProposals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MaterialStorerooms",
                columns: table => new
                {
                    StoreroomId = table.Column<int>(type: "int", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    QuantityMax = table.Column<int>(type: "int", nullable: false),
                    QuantityMin = table.Column<int>(type: "int", nullable: false),
                    Compartment = table.Column<int>(type: "int", nullable: false),
                    Rack = table.Column<int>(type: "int", nullable: false),
                    Row = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialStorerooms", x => new { x.StoreroomId, x.MaterialId });
                    table.ForeignKey(
                        name: "FK_MaterialStorerooms_Materials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialStorerooms_Storerooms_StoreroomId",
                        column: x => x.StoreroomId,
                        principalTable: "Storerooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MaterialTransfers",
                columns: table => new
                {
                    TransferId = table.Column<int>(type: "int", nullable: false),
                    MaterialId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialTransfers", x => new { x.TransferId, x.MaterialId });
                    table.ForeignKey(
                        name: "FK_MaterialTransfers_Materials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialTransfers_Transfers_TransferId",
                        column: x => x.TransferId,
                        principalTable: "Transfers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Inputs_StoreroomId",
                table: "Inputs",
                column: "StoreroomId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialInputs_MaterialId",
                table: "MaterialInputs",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialOutputs_MaterialId",
                table: "MaterialOutputs",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialPurchaseOrders_MaterialId",
                table: "MaterialPurchaseOrders",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialPurchaseProposals_MaterialId",
                table: "MaterialPurchaseProposals",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_Materials_BrandId",
                table: "Materials",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Materials_CountryId",
                table: "Materials",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Materials_MaterialGroupId",
                table: "Materials",
                column: "MaterialGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Materials_UnitOrderId",
                table: "Materials",
                column: "UnitOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialStorerooms_MaterialId",
                table: "MaterialStorerooms",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialTransfers_MaterialId",
                table: "MaterialTransfers",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_Outputs_StoreroomId",
                table: "Outputs",
                column: "StoreroomId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrders_StoreroomId",
                table: "PurchaseOrders",
                column: "StoreroomId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrders_SuplierId",
                table: "PurchaseOrders",
                column: "SuplierId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseProposals_StoreroomId",
                table: "PurchaseProposals",
                column: "StoreroomId");

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_StoreroomNewId",
                table: "Transfers",
                column: "StoreroomNewId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaterialInputs");

            migrationBuilder.DropTable(
                name: "MaterialOutputs");

            migrationBuilder.DropTable(
                name: "MaterialPurchaseOrders");

            migrationBuilder.DropTable(
                name: "MaterialPurchaseProposals");

            migrationBuilder.DropTable(
                name: "MaterialStorerooms");

            migrationBuilder.DropTable(
                name: "MaterialTransfers");

            migrationBuilder.DropTable(
                name: "Inputs");

            migrationBuilder.DropTable(
                name: "Outputs");

            migrationBuilder.DropTable(
                name: "PurchaseOrders");

            migrationBuilder.DropTable(
                name: "PurchaseProposals");

            migrationBuilder.DropTable(
                name: "Materials");

            migrationBuilder.DropTable(
                name: "Transfers");

            migrationBuilder.DropTable(
                name: "Supliers");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "MaterialGroups");

            migrationBuilder.DropTable(
                name: "Units");

            migrationBuilder.DropTable(
                name: "Storerooms");
        }
    }
}
