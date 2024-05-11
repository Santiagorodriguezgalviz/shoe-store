package com.example.shoe.store.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shoe.store.IRepository.IBaseRepository;
import com.example.shoe.store.IRepository.IDescripcionVentasRepository;
import com.example.shoe.store.Entity.DescripcionVentas;
import com.example.shoe.store.IService.IDescripcionVentasService;

@Service
public class DescripcionVentasService extends ABaseService<DescripcionVentas> implements IDescripcionVentasService{
	
	@Autowired
	private IDescripcionVentasRepository repository;

	@Override
	protected IBaseRepository<DescripcionVentas, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}



}
