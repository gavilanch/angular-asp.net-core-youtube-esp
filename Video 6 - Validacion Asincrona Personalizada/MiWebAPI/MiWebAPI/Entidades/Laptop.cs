using System.ComponentModel.DataAnnotations;

namespace MiWebAPI.Entidades
{
    public class Laptop
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        public required string Nombre { get; set; }
    }
}
