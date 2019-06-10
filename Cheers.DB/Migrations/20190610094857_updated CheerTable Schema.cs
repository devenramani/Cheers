using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Cheers.DB.Migrations
{
    public partial class updatedCheerTableSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CheerTime",
                table: "CheerTable",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CheerTime",
                table: "CheerTable",
                nullable: true,
                oldClrType: typeof(DateTime));
        }
    }
}
