using Microsoft.EntityFrameworkCore.Migrations;

namespace Cheers.DB.Migrations
{
    public partial class updateduserandcheertableschema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CheerFromID",
                table: "CheerTable");

            migrationBuilder.DropColumn(
                name: "CheerToID",
                table: "CheerTable");

            migrationBuilder.AlterColumn<string>(
                name: "UPN",
                table: "Users",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheerFrom",
                table: "CheerTable",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CheerTo",
                table: "CheerTable",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "UPN");

            migrationBuilder.CreateIndex(
                name: "IX_CheerTable_CheerFrom",
                table: "CheerTable",
                column: "CheerFrom");

            migrationBuilder.CreateIndex(
                name: "IX_CheerTable_CheerTo",
                table: "CheerTable",
                column: "CheerTo");

            migrationBuilder.AddForeignKey(
                name: "FK_CheerTable_Users_CheerFrom",
                table: "CheerTable",
                column: "CheerFrom",
                principalTable: "Users",
                principalColumn: "UPN",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CheerTable_Users_CheerTo",
                table: "CheerTable",
                column: "CheerTo",
                principalTable: "Users",
                principalColumn: "UPN",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheerTable_Users_CheerFrom",
                table: "CheerTable");

            migrationBuilder.DropForeignKey(
                name: "FK_CheerTable_Users_CheerTo",
                table: "CheerTable");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_CheerTable_CheerFrom",
                table: "CheerTable");

            migrationBuilder.DropIndex(
                name: "IX_CheerTable_CheerTo",
                table: "CheerTable");

            migrationBuilder.DropColumn(
                name: "CheerFrom",
                table: "CheerTable");

            migrationBuilder.DropColumn(
                name: "CheerTo",
                table: "CheerTable");

            migrationBuilder.AlterColumn<string>(
                name: "UPN",
                table: "Users",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "CheerFromID",
                table: "CheerTable",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CheerToID",
                table: "CheerTable",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");
        }
    }
}
