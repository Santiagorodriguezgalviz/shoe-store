package com.example.shoe.store.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shoe.store.Entity.Ventas;
import com.example.shoe.store.IService.IVentasService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/ventas")
public class VentasController extends ABaseController<Ventas, IVentasService>{

	protected VentasController(IVentasService service) {
		super(service, "Ventas");
		// TODO Auto-generated constructor stub
	}

}
