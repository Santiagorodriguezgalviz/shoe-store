package com.example.shoe.store.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shoe.store.Entity.Productos;
import com.example.shoe.store.IService.IProductosService;;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/productos")
public class ProductosController extends ABaseController<Productos, IProductosService>{

	protected ProductosController(IProductosService service) {
		super(service, "Productos");
		// TODO Auto-generated constructor stub
	}

}
