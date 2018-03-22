﻿using AutoMapper;
using CloudDelivery.Data.Entities;
using CloudDelivery.Data.Enums.Routes;
using CloudDelivery.Models;
using CloudDelivery.Models.Orders;
using CloudDelivery.Models.Routes;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudDelivery.App_Start
{
    public class AutoMapperConfig
    {
        public static void Register()
        {
            Mapper.Initialize(cfg =>
            {
                //users
                cfg.CreateMap<User, UserVM>()
                .ForMember(dest => dest.Login, opt =>
                opt.MapFrom(src => src.AspNetUser.UserName))
                .ForMember(dest => dest.Name, opt =>
                opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Organisation, opt =>
                opt.MapFrom(src => src.Organisation.Name))
                .ForMember(dest => dest.OrganisationId, opt =>
                opt.MapFrom(src => src.OrganisationId))
                .ForMember(dest => dest.Phone, opt =>
                opt.MapFrom(src => src.AspNetUser.PhoneNumber));



                cfg.CreateMap<User, UserListVM>()
                .ForMember(dest => dest.Login, opt =>
                opt.MapFrom(src => src.AspNetUser.UserName))
                .ForMember(dest => dest.Name, opt =>
                opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Organisation, opt =>
                opt.MapFrom(src => src.Organisation.Name))
                .ForMember(dest => dest.OrganisationId, opt =>
                opt.MapFrom(src => src.OrganisationId));

                //orders
                cfg.CreateMap<OrderEditModel, Order>()
                .ForMember(dest => dest.EndLatLng, opt =>
                opt.MapFrom(src => src.EndLatLng.ToJsonString()));

                cfg.CreateMap<Order, OrderVM>()
                .ForMember(dest => dest.SalepointName, opt =>
                opt.MapFrom(src => src.SalePoint.User.Name))
                .ForMember(dest => dest.CarrierName, opt =>
                opt.MapFrom(src => src.Carrier.User.Name));

                cfg.CreateMap<Order, OrderListVM>()
                .ForMember(dest => dest.SalepointName, opt =>
                opt.MapFrom(src => src.SalePoint.User.Name))
                .ForMember(dest => dest.CarrierName, opt =>
                opt.MapFrom(src => src.Carrier.User.Name));

                cfg.CreateMap<Order, OrderMapVM>()
               .ForMember(dest => dest.SalepointName, opt =>
               opt.MapFrom(src => src.SalePoint.User.Name))
               .ForMember(dest => dest.SalepointCity, opt =>
               opt.MapFrom(src => src.SalePoint.City))
               .ForMember(dest => dest.SalepointAddress, opt =>
               opt.MapFrom(src => src.SalePoint.Address));


                cfg.CreateMap<Order, OrderDetailsMapVM>()
              .ForMember(dest => dest.SalepointName, opt =>
              opt.MapFrom(src => src.SalePoint.User.Name))
              .ForMember(dest => dest.SalepointCity, opt =>
              opt.MapFrom(src => src.SalePoint.City))
              .ForMember(dest => dest.SalepointAddress, opt =>
              opt.MapFrom(src => src.SalePoint.Address))
              .ForMember(dest => dest.SalepointPhone, opt =>
              opt.MapFrom(src => src.SalePoint.User.AspNetUser.PhoneNumber));


                cfg.CreateMap<Route, RouteVM>();
                cfg.CreateMap<RoutePoint, RoutePointViewModel>();
                cfg.CreateMap<IdentityRole, RoleVM>();
                cfg.CreateMap<Organisation, OrganisationVM>();
                cfg.CreateMap<Carrier, CarrierVM>();
                cfg.CreateMap<SalePoint, SalePointVM>();
            });
        }
    }
}