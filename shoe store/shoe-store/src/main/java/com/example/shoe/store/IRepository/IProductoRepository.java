package com.example.shoe.store.IRepository;

import org.springframework.stereotype.Repository;

import com.example.shoe.store.Entity.Productos;

@Repository
public interface IProductoRepository extends IBaseRepository<Productos, Long>{

}
