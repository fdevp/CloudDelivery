namespace CloudDelivery.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RefreshTokenEnhancement : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.RefreshTokens", name: "UserId", newName: "User_Id");
            RenameIndex(table: "dbo.RefreshTokens", name: "IX_UserId", newName: "IX_User_Id");
            AddColumn("dbo.RefreshTokens", "IdentityId", c => c.String(maxLength: 128));
            AddColumn("dbo.RefreshTokens", "Active", c => c.Boolean(nullable: false));
            AddColumn("dbo.RefreshTokens", "Device", c => c.String());
            AddColumn("dbo.RefreshTokens", "Issued", c => c.DateTime(nullable: false));
            CreateIndex("dbo.RefreshTokens", "IdentityId");
            AddForeignKey("dbo.RefreshTokens", "IdentityId", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RefreshTokens", "IdentityId", "dbo.AspNetUsers");
            DropIndex("dbo.RefreshTokens", new[] { "IdentityId" });
            DropColumn("dbo.RefreshTokens", "Issued");
            DropColumn("dbo.RefreshTokens", "Device");
            DropColumn("dbo.RefreshTokens", "Active");
            DropColumn("dbo.RefreshTokens", "IdentityId");
            RenameIndex(table: "dbo.RefreshTokens", name: "IX_User_Id", newName: "IX_UserId");
            RenameColumn(table: "dbo.RefreshTokens", name: "User_Id", newName: "UserId");
        }
    }
}
