package com.example.shoe.store.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shoe.store.Entity.Ventas;
import com.example.shoe.store.IRepository.IBaseRepository;
import com.example.shoe.store.IRepository.IVentasRepository;
import com.example.shoe.store.IService.IVentasService;

@Service
public class VentasService extends ABaseService<Ventas> implements IVentasService{
	
	@Autowired
	private IVentasRepository repository;

	@Override
	protected IBaseRepository<Ventas, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}

}
