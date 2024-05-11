// Función para cargar una vista en el dashboard
function cargarVista(url) {
    // Realizar una petición AJAX para obtener el contenido de la vista
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            // Actualizar el contenido del contenedor con el contenido de la vista
            $('#formularioContainer').html(data);
        },
        error: function(xhr, status, error) {
            // Manejar errores si la petición falla
            console.error('Error al cargar la vista:', error);
        }
    });
}

// Event listener para los enlaces de las vistas
$('.collapse-item').click(function(e) {
    e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    var url = $(this).attr('href'); // Obtener la URL de la vista desde el enlace
    cargarVista(url); // Cargar la vista en el dashboard
});
function loadAddCliente() {
    // Cargar el formulario de agregar cliente en el contenedor
    $('#contenidoDinamico').load('./view/AgregarCliente.html');
}
