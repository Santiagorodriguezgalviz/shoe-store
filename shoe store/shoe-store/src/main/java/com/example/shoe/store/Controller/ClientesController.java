package com.example.shoe.store.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.shoe.store.Entity.Clientes;
import com.example.shoe.store.IService.IClientesService;
import com.example.shoe.store.Dto.ApiResponseDto;
import com.example.shoe.store.Dto.IClientesDto;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/clientes")
public class ClientesController extends ABaseController<Clientes, IClientesService>{

	protected ClientesController(IClientesService service) {
		super(service, "Clientes");
		// TODO Auto-generated constructor stub
	}
	
	@GetMapping("/filter/{tipo}")
    public ResponseEntity<ApiResponseDto<List<IClientesDto>>> show(@PathVariable String tipo) {
        try {
            List<IClientesDto> entity = service.getTypoIdentificacion(tipo);
            return ResponseEntity.ok(new ApiResponseDto<List<IClientesDto>>("Registro encontrado", entity, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<List<IClientesDto>>(e.getMessage(), null, false));
        }
		}
	
	@GetMapping("/filter")
	public ResponseEntity<ApiResponseDto<List<Clientes>>> filterClientes(
	    @RequestParam(required = false) String nombre_cliente,
	    @RequestParam(required = false) String ciudad,
	    @RequestParam(required = false) String state) {
	    try {
	        Boolean stateBool = state != null ? Boolean.parseBoolean(state) : null;
	        List<Clientes> clientes = service.findByNombreAndCiudadAndState(nombre_cliente, ciudad, stateBool);
	        return ResponseEntity.ok(new ApiResponseDto<>("Filtro aplicado con éxito", clientes, true));
	    } catch (Exception e) {
	        return ResponseEntity.internalServerError().body(new ApiResponseDto<>(e.getMessage(), null, false));
	    }
	}
}
