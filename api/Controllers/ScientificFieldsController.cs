using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.IO;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScientificFieldsController : ControllerBase
    {
        private readonly string _jsonFilePath = "scientific_fields.json";

        private List<string> LoadFromJson()
        {
            using (StreamReader reader = new StreamReader(_jsonFilePath))
            {
                string json = reader.ReadToEnd();
                var data = JsonSerializer.Deserialize<ScientificFieldData>(json);
                return data.ScientificFields;
            }
        }

        [HttpGet("fields")]
        public IActionResult GetFields()
        {
            var fields = LoadFromJson();
            return Ok(fields);
        }
    }

    public class ScientificFieldData
    {
        public List<string> ScientificFields { get; set; }
    }
}
