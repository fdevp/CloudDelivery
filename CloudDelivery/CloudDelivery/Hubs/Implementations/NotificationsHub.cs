using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Practices.Unity;

namespace CloudDelivery.Hubs
{
    [Authorize]
    public class NotificationsHub : Hub<INotificationsHub>
    {
        public override Task OnConnected()
        {
            if (Context.User.IsInRole("carrier"))
                this.Groups.Add(this.Context.ConnectionId, "carriers");

            return base.OnConnected();
        }

    }

}