﻿using Cheers.DB.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cheers.DB
{
    public class CheersDbContext : DbContext
    {


        public CheersDbContext(DbContextOptions<CheersDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }
        public DbSet<User> Users { get; set; }

        public DbSet<CheerTable> CheerTable { get; set; }

        public DbSet<Feedback> Feedback { get; set; }
        public DbSet<StartStop> StartStop { get; set; }

    }
}

