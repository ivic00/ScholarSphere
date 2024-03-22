using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddUserPaperMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AuthorId",
                table: "Papers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Papers_AuthorId",
                table: "Papers",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Papers_Users_AuthorId",
                table: "Papers",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Papers_Users_AuthorId",
                table: "Papers");

            migrationBuilder.DropIndex(
                name: "IX_Papers_AuthorId",
                table: "Papers");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Papers");
        }
    }
}
