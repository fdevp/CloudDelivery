namespace CloudDelivery.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class names : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Name", c => c.String());
            DropColumn("dbo.Carriers", "Name");
            DropColumn("dbo.SalePoints", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SalePoints", "Name", c => c.String());
            AddColumn("dbo.Carriers", "Name", c => c.String());
            DropColumn("dbo.Users", "Name");
        }
    }
}
