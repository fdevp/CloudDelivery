namespace CloudDelivery.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ticket92 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Orders", "CarrierId", "dbo.Carriers");
            DropIndex("dbo.Orders", new[] { "CarrierId" });
            AddColumn("dbo.Orders", "PickUpTime", c => c.DateTime());
            AddColumn("dbo.Orders", "DeliveredTime", c => c.DateTime());
            AlterColumn("dbo.Orders", "CarrierId", c => c.Int());
            CreateIndex("dbo.Orders", "CarrierId");
            AddForeignKey("dbo.Orders", "CarrierId", "dbo.Carriers", "Id");
            DropColumn("dbo.Orders", "FinalPickUpTime");
            DropColumn("dbo.Orders", "FinalDeliveryTime");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Orders", "FinalDeliveryTime", c => c.DateTime());
            AddColumn("dbo.Orders", "FinalPickUpTime", c => c.DateTime());
            DropForeignKey("dbo.Orders", "CarrierId", "dbo.Carriers");
            DropIndex("dbo.Orders", new[] { "CarrierId" });
            AlterColumn("dbo.Orders", "CarrierId", c => c.Int(nullable: false));
            DropColumn("dbo.Orders", "DeliveredTime");
            DropColumn("dbo.Orders", "PickUpTime");
            CreateIndex("dbo.Orders", "CarrierId");
            AddForeignKey("dbo.Orders", "CarrierId", "dbo.Carriers", "Id", cascadeDelete: true);
        }
    }
}
