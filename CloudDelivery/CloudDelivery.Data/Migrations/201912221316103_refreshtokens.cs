namespace CloudDelivery.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class refreshtokens : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RefreshTokens",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(),
                        Token = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RefreshTokens", "UserId", "dbo.Users");
            DropIndex("dbo.RefreshTokens", new[] { "UserId" });
            DropTable("dbo.RefreshTokens");
        }
    }
}
