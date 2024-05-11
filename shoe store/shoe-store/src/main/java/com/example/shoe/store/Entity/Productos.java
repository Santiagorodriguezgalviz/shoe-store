package com.example.shoe.store.Entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "produtos")
public class Productos extends ABaseEntity{
	
	@Column(name = "nombre_producto", length = 45, nullable = false)
	private String nombreProducto;
	
	@Column(name = "descripcion", length = 45, nullable = false)
	private String descripcion;
	
	@Column(name = "cantidad", nullable = false)
	private int cantidad;
	
	@Column(name = "precio", nullable = false)
	private BigDecimal precio;
	
	@Column(name = "porcentaje_iva", nullable = false)
	private int porcentajeIva;
	
	@Column(name = "porcentaje_descuento", nullable = false)
	private int procentajeDescento;

	public String getNombreProducto() {
		return nombreProducto;
	}

	public void setNombreProducto(String nombreProducto) {
		this.nombreProducto = nombreProducto;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public BigDecimal getPrecio() {
		return precio;
	}

	public void setPrecio(BigDecimal precio) {
		this.precio = precio;
	}

	public int getPorcentajeIva() {
		return porcentajeIva;
	}

	public void setPorcentajeIva(int porcentajeIva) {
		this.porcentajeIva = porcentajeIva;
	}

	public int getProcentajeDescento() {
		return procentajeDescento;
	}

	public void setProcentajeDescento(int procentajeDescento) {
		this.procentajeDescento = procentajeDescento;
	}
	

}
