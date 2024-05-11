package com.example.shoe.store.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shoe.store.Entity.DescripcionVentas;
import com.example.shoe.store.IService.IDescripcionVentasService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/descripcion_ventas")
public class DescripcionVentasController extends ABaseController<DescripcionVentas, IDescripcionVentasService>{

	protected DescripcionVentasController(IDescripcionVentasService service) {
		super(service, "Descripcion_Ventas");
		// TODO Auto-generated constructor stub
	}

}
