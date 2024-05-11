package com.example.shoe.store.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shoe.store.Entity.Productos;
import com.example.shoe.store.IRepository.IBaseRepository;
import com.example.shoe.store.IRepository.IProductoRepository;
import com.example.shoe.store.IService.IProductosService;

@Service
public class ProductosService extends ABaseService<Productos> implements IProductosService{
	
	@Autowired
	private IProductoRepository repository;

	@Override
	protected IBaseRepository<Productos, Long> getRepository() {
		// TODO Auto-generated method stub
		return repository;
	}

}
