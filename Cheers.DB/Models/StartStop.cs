using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cheers.DB.Models
{
    public class StartStop
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
        public DateTime TimeStamp { get; set; }
        public string From { get; set; }
    }
}
