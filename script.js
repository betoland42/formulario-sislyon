// Elementos obtenidos mediante el DOM
const formulario = document.querySelector("#formularioSoporte");
const nombre = document.querySelector("#nombre");
const telefono = document.querySelector("#telefono");
const descripcion = document.querySelector("#descripcion");
const servicio = document.querySelector("#servicio");
const mensajeResultado = document.querySelector("#mensajeResultado");

// Valida texto evitando que se acepten solamente espacios
function validarTexto(campo, minimo) {
    const contenidoValido = campo.value.trim().length >= minimo;

    if (contenidoValido) {
        campo.setCustomValidity("");
    } else {
        campo.setCustomValidity("Campo inválido");
    }
}

// Evento input para validar el nombre mientras se escribe
nombre.addEventListener("input", function () {
    validarTexto(nombre, 3);
});

// Evento input para aceptar únicamente números en el teléfono
telefono.addEventListener("input", function () {
    telefono.value = telefono.value
        .replace(/\D/g, "")
        .slice(0, 10);
});

// Evento input para validar la descripción
descripcion.addEventListener("input", function () {
    validarTexto(descripcion, 10);
});

// Evento principal al enviar el formulario
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    validarTexto(nombre, 3);
    validarTexto(descripcion, 10);

    formulario.classList.add("was-validated");

    // Comprueba todas las validaciones de HTML y JavaScript
    if (!formulario.checkValidity()) {
        mensajeResultado.className = "alert alert-danger mt-4";
        mensajeResultado.textContent =
            "Revisa los campos marcados antes de enviar la solicitud.";

        const primerCampoInvalido =
            formulario.querySelector(":invalid");

        if (primerCampoInvalido) {
            primerCampoInvalido.focus();
        }

        return;
    }

    const nombreCliente = nombre.value.trim();
    const servicioSeleccionado =
        servicio.options[servicio.selectedIndex].text;

    // Modifica el contenido de la página mediante el DOM
    mensajeResultado.className = "alert alert-success mt-4";
    mensajeResultado.textContent =
        `¡Gracias, ${nombreCliente}! Tu solicitud de ` +
        `${servicioSeleccionado} fue registrada correctamente.`;

    formulario.reset();
    formulario.classList.remove("was-validated");
});