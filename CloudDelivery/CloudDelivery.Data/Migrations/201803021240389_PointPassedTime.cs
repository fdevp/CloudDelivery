namespace CloudDelivery.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PointPassedTime : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RoutePoints", "PassedTime", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.RoutePoints", "PassedTime");
        }
    }
}
