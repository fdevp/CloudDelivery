namespace CloudDelivery.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ticket78 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Carriers", "Marker", c => c.String());
            AddColumn("dbo.Orders", "DestinationCity", c => c.String());
            AddColumn("dbo.Orders", "DestinationAddress", c => c.String());
            AddColumn("dbo.Orders", "Priority", c => c.Int(nullable: false));
            AddColumn("dbo.Orders", "TraceJSON", c => c.String());
            AddColumn("dbo.SalePoints", "Marker", c => c.String());
            DropColumn("dbo.Carriers", "Color");
            DropColumn("dbo.Orders", "RequiredDeliveryTime");
            DropColumn("dbo.SalePoints", "Color");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SalePoints", "Color", c => c.String());
            AddColumn("dbo.Orders", "RequiredDeliveryTime", c => c.DateTime());
            AddColumn("dbo.Carriers", "Color", c => c.String());
            DropColumn("dbo.SalePoints", "Marker");
            DropColumn("dbo.Orders", "TraceJSON");
            DropColumn("dbo.Orders", "Priority");
            DropColumn("dbo.Orders", "DestinationAddress");
            DropColumn("dbo.Orders", "DestinationCity");
            DropColumn("dbo.Carriers", "Marker");
        }
    }
}
