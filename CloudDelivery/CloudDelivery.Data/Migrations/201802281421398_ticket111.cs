namespace CloudDelivery.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ticket111 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Routes", "AddedTime", c => c.DateTime(nullable: false));
            DropColumn("dbo.Orders", "StartLatLng");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Orders", "StartLatLng", c => c.String());
            AlterColumn("dbo.Routes", "AddedTime", c => c.DateTime());
        }
    }
}
