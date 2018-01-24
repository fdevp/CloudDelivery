using AutoMapper;
using CloudDelivery.Data.Entities;
using CloudDelivery.Models;
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



                cfg.CreateMap<IdentityRole,RoleVM>();
                cfg.CreateMap<Organisation, OrganisationVM>();
                cfg.CreateMap<Carrier, CarrierVM>();
                cfg.CreateMap<SalePoint, SalepointVM>();
            });
        }
    }
}