global using System;
global using System.Text;
global using System.Collections.Generic;
global using System.Linq;
global using System.Threading.Tasks;

global using Microsoft.AspNetCore.Builder;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Configuration;
global using Microsoft.OpenApi.Models;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.IdentityModel.Tokens;
global using Microsoft.Extensions.Hosting;
global using Microsoft.AspNetCore.Identity;
global using Microsoft.AspNetCore.Authorization;
global using Microsoft.Extensions.Logging;
global using Microsoft.AspNetCore.Mvc;

global using API.Data;
global using API.Entities;
global using API.RequestHelpers;
global using API.Services;
global using API.Middleware;
global using API.DTOs;
global using API.Extensions;