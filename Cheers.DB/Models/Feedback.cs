using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Cheers.DB.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
        public string From { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
