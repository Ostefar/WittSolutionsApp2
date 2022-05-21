using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WittSolutionsApp2.Migrations
{
    public partial class willThisDoInitial3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_id",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Address_id",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
