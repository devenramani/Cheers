using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Cheers.DB.Migrations
{
    public partial class AddedCheersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CheerTable",
                columns: table => new
                {
                    CheerID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CheerText = table.Column<string>(nullable: true),
                    CheerFromID = table.Column<int>(nullable: false),
                    CheerToID = table.Column<int>(nullable: false),
                    CheerTime = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheerTable", x => x.CheerID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CheerTable");
        }
    }
}
