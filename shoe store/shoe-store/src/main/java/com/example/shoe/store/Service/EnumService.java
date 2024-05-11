package com.example.shoe.store.Service;

import org.springframework.stereotype.Service;

import com.example.shoe.store.IService.IEnumService;
import com.example.shoe.store.Utils.tipo_identificacion;
import com.example.shoe.store.Utils.direccion;

@Service
public class EnumService implements IEnumService{
	
	@Override
    public tipo_identificacion[] getTypoIdentificacion() {
        return tipo_identificacion.values();
    }
	
	@Override
	public direccion[] getDireccion() {
		// TODO Auto-generated method stub
		return direccion.values();
	}
}
