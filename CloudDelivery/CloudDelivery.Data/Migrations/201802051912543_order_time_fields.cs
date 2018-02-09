namespace CloudDelivery.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class order_time_fields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Orders", "AddedTime", c => c.DateTime());
            AddColumn("dbo.Orders", "AcceptedTime", c => c.DateTime());
            AddColumn("dbo.Orders", "CancellationTime", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Orders", "CancellationTime");
            DropColumn("dbo.Orders", "AcceptedTime");
            DropColumn("dbo.Orders", "AddedTime");
        }
    }
}
