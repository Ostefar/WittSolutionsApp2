using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WittSolutionsApp2.Migrations
{
    public partial class small : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employee_Address_AddressId",
                table: "Employee");

            migrationBuilder.DropForeignKey(
                name: "FK_Hours_Employee_EmployeeId",
                table: "Hours");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Employee_EmployeeId",
                table: "Projects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employee",
                table: "Employee");

            migrationBuilder.RenameTable(
                name: "Employee",
                newName: "Employees");

            migrationBuilder.RenameIndex(
                name: "IX_Employee_AddressId",
                table: "Employees",
                newName: "IX_Employees_AddressId");

            migrationBuilder.AddColumn<int>(
                name: "VacationDaysLeft",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employees",
                table: "Employees",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Address_AddressId",
                table: "Employees",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Hours_Employees_EmployeeId",
                table: "Hours",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Employees_EmployeeId",
                table: "Projects",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Address_AddressId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Hours_Employees_EmployeeId",
                table: "Hours");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Employees_EmployeeId",
                table: "Projects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employees",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "VacationDaysLeft",
                table: "Employees");

            migrationBuilder.RenameTable(
                name: "Employees",
                newName: "Employee");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_AddressId",
                table: "Employee",
                newName: "IX_Employee_AddressId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employee",
                table: "Employee",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employee_Address_AddressId",
                table: "Employee",
                column: "AddressId",
                principalTable: "Address",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Hours_Employee_EmployeeId",
                table: "Hours",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Employee_EmployeeId",
                table: "Projects",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "Id");
        }
    }
}
