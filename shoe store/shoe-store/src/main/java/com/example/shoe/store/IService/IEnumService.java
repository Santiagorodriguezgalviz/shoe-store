package com.example.shoe.store.IService;

import com.example.shoe.store.Utils.tipo_identificacion;
import com.example.shoe.store.Utils.direccion;

public interface IEnumService {
	
	tipo_identificacion[] getTypoIdentificacion();
	
	direccion[] getDireccion();

}
