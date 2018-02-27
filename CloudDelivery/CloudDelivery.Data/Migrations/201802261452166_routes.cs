namespace CloudDelivery.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class routes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RoutePoints",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RouteId = c.Int(nullable: false),
                        Type = c.Int(nullable: false),
                        Index = c.Int(nullable: false),
                        OrderId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Orders", t => t.OrderId)
                .ForeignKey("dbo.Routes", t => t.RouteId, cascadeDelete: true)
                .Index(t => t.RouteId)
                .Index(t => t.OrderId);
            
            CreateTable(
                "dbo.Routes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CarrierId = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                        AddedTime = c.DateTime(),
                        FinishTime = c.DateTime(),
                        StartLatLng = c.String(),
                        Distance = c.Int(),
                        Duration = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Carriers", t => t.CarrierId, cascadeDelete: true)
                .Index(t => t.CarrierId);
            
            AddColumn("dbo.Orders", "Duration", c => c.Int());
            DropColumn("dbo.Orders", "TraceJSON");
            DropColumn("dbo.Orders", "DistanceMeters");
            DropColumn("dbo.Orders", "ExpectedMinutes");
            DropColumn("dbo.Orders", "FinalMinutes");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Orders", "FinalMinutes", c => c.Int());
            AddColumn("dbo.Orders", "ExpectedMinutes", c => c.Int());
            AddColumn("dbo.Orders", "DistanceMeters", c => c.Int());
            AddColumn("dbo.Orders", "TraceJSON", c => c.String());
            DropForeignKey("dbo.RoutePoints", "RouteId", "dbo.Routes");
            DropForeignKey("dbo.Routes", "CarrierId", "dbo.Carriers");
            DropForeignKey("dbo.RoutePoints", "OrderId", "dbo.Orders");
            DropIndex("dbo.Routes", new[] { "CarrierId" });
            DropIndex("dbo.RoutePoints", new[] { "OrderId" });
            DropIndex("dbo.RoutePoints", new[] { "RouteId" });
            DropColumn("dbo.Orders", "Duration");
            DropTable("dbo.Routes");
            DropTable("dbo.RoutePoints");
        }
    }
}
