package com.example.shoe.store.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shoe.store.Dto.IClientesDto;
import com.example.shoe.store.Entity.Clientes;
import com.example.shoe.store.IRepository.IBaseRepository;
import com.example.shoe.store.IRepository.IClientesRepository;
import com.example.shoe.store.IService.IClientesService;

@Service
public class ClientesService extends ABaseService<Clientes> implements IClientesService{
	
	@Autowired
	private IClientesRepository repository;

	@Override
	protected IBaseRepository<Clientes, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}

	@Override
	public List<IClientesDto> getTypoIdentificacion(String tipo) {
		// TODO Auto-generated method stub
		return repository.getTypoIdentificacion(tipo);
	}
	
	@Override
	public List<Clientes> findByNombreAndCiudadAndState(String nombre_cliente, String ciudad, Boolean state) {
	    return repository.findByNombreAndCiudadAndState(nombre_cliente, ciudad, state);
	}
}
