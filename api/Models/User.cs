using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }    
        public UserRole Role { get; set; }
        /*public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }*/

        public User(int Id, string UserName, string FirstName, string LastName, UserRole Role)
        {
            this.Id = Id;
            this.UserName = UserName;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Role = Role;
        }
    }
}