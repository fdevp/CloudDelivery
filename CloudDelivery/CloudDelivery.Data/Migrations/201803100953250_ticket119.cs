namespace CloudDelivery.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ticket119 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Orders", "CustomerPhone", c => c.String());
            AddColumn("dbo.Orders", "Price", c => c.Decimal(precision: 18, scale: 2));
            DropColumn("dbo.Routes", "StartLatLng");
            DropColumn("dbo.Routes", "Distance");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Routes", "Distance", c => c.Int());
            AddColumn("dbo.Routes", "StartLatLng", c => c.String());
            DropColumn("dbo.Orders", "Price");
            DropColumn("dbo.Orders", "CustomerPhone");
        }
    }
}
