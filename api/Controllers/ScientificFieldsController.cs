using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Collections.Generic;
using System.IO;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScientificFieldsController : ControllerBase
    {
        private readonly string _jsonFilePath = "scientific_fields.json";

        private ScientificFieldData LoadFromJson()
        {
            using (StreamReader reader = new StreamReader(_jsonFilePath))
            {
                string json = reader.ReadToEnd();
                return JsonSerializer.Deserialize<ScientificFieldData>(json);
            }
        }

        [HttpGet("groups")]
        public IActionResult GetGroups()
        {
            var data = LoadFromJson();
            return Ok(data.ScientificFields.Keys);
        }

        [HttpGet("fields/{group}")]
        public IActionResult GetFieldsByGroup(string group)
        {
            var data = LoadFromJson();
            if (data.ScientificFields.ContainsKey(group))
            {
                return Ok(data.ScientificFields[group]);
            }
            else
            {
                return NotFound();
            }
        }
    }
}