function save() {

    var selectVentaId = parseInt($("#selected_venta_id").val());
    if (isNaN(selecVentaId) || selecVentaId === null) {
        console.error("ID de venta no válido");
        return;
    }

    var selectProductoId = parseInt($("#selected_producto_id").val());
    if (isNaN(selectProductoId) || selectProductoId === null) {
        console.error("ID de producto no válido");
        return;
    }


    try {
        var data = {
            "venta": {
                "id": selectVentaId
            },
            "producto": {
                "id": selectProductoId
            },
            "cantidad": $("#cantidad").val(),
            "precio": $("#precio").val(),
            "descuento": $("#descuento").val(),
            "sub_total": $("#sub_total").val(),
            'state': parseInt($('#estado').val())

        };

        console.log(ventaData);

        $.ajax({
            url: "http://localhost:9000/prueba/v1/api/descripcion_ventas",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(ventaData),
            success: function (data) {
                var id = data.id;
                console.log(data.data);

                alert("Registro agregado con éxito");
                clearData();
                loadData();
            },
        });
    } catch (error) {
        console.error("Error obteniendo el descripcion_ventas:", error);
    }
}

function loadData() {

    console.log("ejecutando loadData");
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/descripcion_ventas",
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response.data);
            var html = "";
            var data = response.data;
            data.forEach(function (item) {
                // Construir el HTML para cada objeto
                if (!item.deletedAt) { // Verificar si el campo deletedAt es nulo (no eliminado lógicamente)

                    html +=
                        `<tr>
                    <td>${item.cliente.name +''+ cliente.apellido}</td>
                    <td>` + item.producto.nombreProducto + `</td>
                    <td>` + item.cantidad + `</td>
                    <td>` + item.precio + `</td>
                    <td>` + item.decuento + `</td>
                    <td>` + item.sub_total + `</td>
                    <td>` + (item.state == true ? "Activo" : "Inactivo") + `</td>
                    <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findById(${item.id})"> <img src="../icon/pencil-square.svg" > </button>
                    <button type="button" class="btn btn-secundary" onclick="deleteById(${item.id})"> <img src="../icon/trash3.svg" > </button></td>
                </tr>`;

                };
            });

            $("#resultData").html(html);
        },
        error: function (error) {
            // Función que se ejecuta si hay un error en la solicitud
            console.error("Error en la solicitud:", error);
        },
    });
}


function loadVentas() {
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/ventas",
        method: "GET",
        dataType: "json",
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var ventas = response.data.map(function(venta) {
                    return {
                        label: venta.cliente.nombre_cliente+ " " +venta.cliente.apellido_cliente,
                        value: venta.id
                    };
                });
  
                // Inicializar el autocompletado en el campo de entrada de texto
                $("#venta_id").autocomplete({
                    source: ventas,
                    select: function(event, ui) {
                        // Al seleccionar un elemento del autocompletado, guarda el ID en un campo oculto
                        $("#selected_venta_id").val(ui.item.value);
                        // Actualiza el valor del campo de entrada con el nombre de la ventaa seleccionada
                        $("#venta_id").val(ui.item.label);
                        console.log("ID de venta seleccionada: " + ui.item.value);
                        return false; // Evita la propagación del evento y el formulario de envío
                    }
                });
            } else {
                console.error("Error: No se pudo obtener la lista de Ventas.");
            }
        },
        error: function(error) {
            // Función que se ejecuta si hay un error en la solicitud
            console.error("Error en la solicitud:", error);
        }
    });
  }

  function loadProductos() {
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/productos",
        method: "GET",
        dataType: "json",
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var productos = response.data.map(function(producto) {
                    return {
                        label: producto.nombre_producto,
                        value: producto.id
                    };
                });
  
                // Inicializar el autocompletado en el campo de entrada de texto
                $("#producto_id").autocomplete({
                    source: productos,
                    select: function(event, ui) {
                        // Al seleccionar un elemento del autocompletado, guarda el ID en un campo oculto
                        $("#selected_producto_id").val(ui.item.value);
                        // Actualiza el valor del campo de entrada con el nombre de la producto seleccionada
                        $("#producto_id").val(ui.item.label);
                        console.log("ID de producto seleccionada: " + ui.item.value);
                        return false; // Evita la propagación del evento y el formulario de envío
                    }
                });
            } else {
                console.error("Error: No se pudo obtener la lista de productos.");
            }
        },
        error: function(error) {
            // Función que se ejecuta si hay un error en la solicitud
            console.error("Error en la solicitud:", error);
        }
    });
  }

function findById(id) {
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/descripcion_ventas/" + id,
        method: "GET",
        dataType: "json",
        success: function (response) {
            var data = response.data;
            $("#id").val(data.id);
            $("#venta_id").val(data.venta.cliente.nombre_cliente+" "+data.venta.cliente.apellido_cliente);
            $("#selected_venta_id").val(data.venta.id);
            $("#producto_id").val(data.producto.cliente.nombre_producto);
            $("#selected_producto_id").val(data.producto.id);
            $('#cantidad').val(data.cantidad);
            $('#precio').val(data.precio);
            $('#descuento').val(data.descuento);
            $('#sub_total').val(data.sub_total);
            $("#estado").val(data.state == true ? 1 : 0);

            //Cambiar boton.
            var btnAgregar = $('button[name="btnAgregar"]');
            btnAgregar.text("Actualizar");
            btnAgregar.attr("onclick", "update()");
        },
        error: function (error) {
            // Función que se ejecuta si hay un error en la solicitud
            console.error("Error en la solicitud:", error);
        },
    });
}


function update() {
    // Construir el objeto data
    var selectVentaId = parseInt($("#selected_venta_id").val());
    if (isNaN(selecVentaId) || selecVentaId === null) {
        console.error("ID de venta no válido");
        return;
    }

    var selectProductoId = parseInt($("#selected_producto_id").val());
    if (isNaN(selectProductoId) || selectProductoId === null) {
        console.error("ID de producto no válido");
        return;
    }

    try {
        var data = {
            "venta": {
                "id": selectVentaId
            },
            "producto": {
                "id": selectProductoId
            },
            "cantidad": $("#cantidad").val(),
            "precio": $("#precio").val(),
            "descuento": $("#descuento").val(),
            "sub_total": $("#sub_total").val(),
            'state': parseInt($('#estado').val())

        };

        var id = $("#id").val();
        var jsonData = JSON.stringify(data);
        $.ajax({
            url: "http://localhost:9000/prueba/v1/api/descripcion_ventas/" + id,
            data: jsonData,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            success: function (result) {
                Swal.fire({
                    title: 'Actualizado!',
                    text: 'Registro actualizado con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                loadData();
                clearData();

                // Actualizar botón
                var btnAgregar = $('button[name="btnAgregar"]');
                btnAgregar.text("Agregar");
                btnAgregar.attr("onclick", "save()");
            },
            error: function (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'No se pudo actualizar el registro',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                });
                console.error("Error en la solicitud:", error);
                loadData();
                clearData();
                var btnAgregar = $('button[name="btnAgregar"]');
                btnAgregar.text("Agregar");
                btnAgregar.attr("onclick", "save()");
            }
        });
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Error en actualizar producto.',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false
        });
        console.error("Error en la solicitud:", error);
        loadData();
        clearData();
        var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Agregar");
        btnAgregar.attr("onclick", "save()");
    }
}


function deleteById(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://localhost:9000/prueba/v1/api/descripcion_ventas/" + id,
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                }
            }).done(function (result) {
                Swal.fire({
                    title: 'Eliminado!',
                    text: 'El registro ha sido eliminado.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                loadData();
            }).fail(function (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'No se pudo eliminar el registro: ' + error.statusText,
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: 'Cancelado',
                text: 'La operación de eliminación ha sido cancelada',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    });
}

function clearData() {
    $("#venta_id").val('');
    $("#producto_id").val('');
    $("#cantidad").val('');
    $("#precio").val('');
    $("#descuento").val('');
    $("#sub_total").val('');
    $("#estado").val('');
    var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Agregar");
        btnAgregar.attr("onclick", "save()");
}