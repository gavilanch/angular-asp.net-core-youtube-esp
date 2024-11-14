using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiWebAPI.Entidades;

namespace MiWebAPI.Controllers
{
    [Route("api/laptops")]
    [ApiController]
    public class LaptopsController: ControllerBase
    {
        private readonly ApplicationDbContext context;

        public LaptopsController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<List<Laptop>> Get()
        {
            return await context.Laptops.ToListAsync();
        }

        [HttpGet("{id:int}", Name = "ObtenerLaptopPorId")]
        public async Task<ActionResult<Laptop>> Get(int id)
        {
            var laptop = await context.Laptops.FirstOrDefaultAsync(x => x.Id == id);

            if (laptop is null)
            {
                return NotFound();
            }

            return laptop;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Laptop laptop)
        {
            var yaExisteLaptopConNombre = await context.Laptops.AnyAsync(x => x.Nombre == laptop.Nombre);

            if (yaExisteLaptopConNombre)
            {
                var mensajeDeError = $"Ya existe una laptop con el nombre {laptop.Nombre}";
                ModelState.AddModelError(nameof(laptop.Nombre), mensajeDeError);
                return ValidationProblem(ModelState); 
            }

            context.Add(laptop);
            await context.SaveChangesAsync();
            return CreatedAtRoute("ObtenerLaptopPorId", new { id = laptop.Id }, laptop);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] Laptop laptop)
        {
            var existeLaptop = await context.Laptops.AnyAsync(x => x.Id == id);

            if (!existeLaptop)
            {
                return NotFound();
            }

            var yaExisteLaptopConNombre = await context.Laptops
                .AnyAsync(x => x.Nombre == laptop.Nombre && x.Id != id);

            if (yaExisteLaptopConNombre) 
            {
                var mensajeDeError = $"Ya existe una laptop con el nombre {laptop.Nombre}";
                ModelState.AddModelError(nameof(laptop.Nombre), mensajeDeError);
                return ValidationProblem(ModelState);
            }

            laptop.Id = id;
            context.Update(laptop);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var filasBorradas = await context.Laptops.Where(x => x.Id == id).ExecuteDeleteAsync();

            if (filasBorradas == 0)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
