function save() {

    var selecClienteId = parseInt($("#selected_cliente_id").val());
    if (isNaN(selecClienteId) || selecClienteId === null) {
        console.error("ID de cliente no válido");
        return;
    }

    try {
        var data = {
            "cliente": {
                "id": selecClienteId
            },
            "total": $("#total").val(),
            "fecha_venta": $("#fecha_venta").val(),
            'state': parseInt($('#estado').val())

        };

        console.log(ventaData);

        $.ajax({
            url: "http://localhost:9000/prueba/v1/api/ventas",
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
        console.error("Error obteniendo el ventas:", error);
    }
}

function loadData() {

    console.log("ejecutando loadData");
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/ventas",
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
                    <td>` + item.total + `</td>
                    <td>` + item.cantidad + `</td>
                    <td>` + item.fecha_venta + `</td>
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


function loadCliente() {
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/clientes",
        method: "GET",
        dataType: "json",
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var clientes = response.data.map(function(cliente) {
                    return {
                        label: cliente.nombre_cliente+ " " +cliente.apellido_cliente,
                        value: cliente.id
                    };
                });
  
                // Inicializar el autocompletado en el campo de entrada de texto
                $("#cliente_id").autocomplete({
                    source: clientes,
                    select: function(event, ui) {
                        // Al seleccionar un elemento del autocompletado, guarda el ID en un campo oculto
                        $("#selected_cliente_id").val(ui.item.value);
                        // Actualiza el valor del campo de entrada con el nombre de la clientea seleccionada
                        $("#cliente_id").val(ui.item.label);
                        console.log("ID de clientea seleccionada: " + ui.item.value);
                        return false; // Evita la propagación del evento y el formulario de envío
                    }
                });
            } else {
                console.error("Error: No se pudo obtener la lista de clientes.");
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
        url: "http://localhost:9000/prueba/v1/api/ventas/" + id,
        method: "GET",
        dataType: "json",
        success: function (response) {
            var data = response.data;
            $("#id").val(data.id);
            $("#cliente_id").val(data.cliente.nombre_cliente+" "+data.cliente.apellido_cliente);
            $("#selected_cliente_id").val(data.cliente.id);
            $('#total').val(data.total);
            $('#fecha_venta').val(data.fecha_venta);
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
    var selecClienteId = parseInt($("#selected_cliente_id").val());
    if (isNaN(selecClienteId) || selecClienteId === null) {
        console.error("ID de clientea no válido");
        return;
    }

    try {
        var data = {
            "cliente": {
                "id": selecClienteId
            },
            "total": $("#total").val(),
            "fecha_venta": $("#fecha_venta").val(),
            'state': parseInt($('#estado').val())

        };

        var id = $("#id").val();
        var jsonData = JSON.stringify(data);
        $.ajax({
            url: "http://localhost:9000/prueba/v1/api/ventas/" + id,
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
                url: "http://localhost:9000/prueba/v1/api/ventas/" + id,
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
    $("#cliente_id").val('');
    $("#total").val('');
    $("#fecha_venta").val('');
    $("#estado").val('');
    var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Agregar");
        btnAgregar.attr("onclick", "save()");
}


