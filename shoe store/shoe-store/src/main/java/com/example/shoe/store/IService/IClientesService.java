package com.example.shoe.store.IService;

import java.util.List;


import com.example.shoe.store.Dto.IClientesDto;
import com.example.shoe.store.Entity.Clientes;

public interface IClientesService extends IBaseService<Clientes>{
	
	List<IClientesDto> getTypoIdentificacion(String tipo);
	
	   List<Clientes> findByNombreAndCiudadAndState(String nombre_cliente, String ciudad, Boolean state);

}
