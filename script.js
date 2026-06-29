const formRegistro = document.getElementById("formulario");
const CLAVE_SOLICITUDES = "clavePersonas";

let personas = JSON.parse(
    localStorage.getItem(CLAVE_SOLICITUDES)
) || [];

function obtenerValor(id) {
    const elemento = document.getElementById(id);

    return elemento
        ? elemento.value.trim()
        : "";
}

function guardarSolicitud() {
    const segmento = document.body.dataset.segmento || "hogar";

    const persona = {
        nombre: obtenerValor("name"),
        correo: obtenerValor("correo"),
        telefono: obtenerValor("phone"),
        servicio: obtenerValor("servicio"),
        segmento: segmento,
        fecha: new Date().toLocaleString("es-PE")
    };

    personas.push(persona);

    localStorage.setItem(
        CLAVE_SOLICITUDES,
        JSON.stringify(personas)
    );
}

function mostrarRegistros() {
    const registros = document.getElementById("registros");

    if (!registros) {
        return;
    }

    registros.innerHTML = "";

    personas.forEach((persona, indice) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${indice + 1}</td>
            <td>${persona.nombre}</td>
            <td>${persona.correo}</td>
            <td>${persona.telefono || "No registrado"}</td>
            <td>${persona.servicio}</td>
            <td>${persona.segmento || "hogar"}</td>
        `;

        registros.appendChild(fila);
    });
}

function mostrarMensajeExito() {
    const mensaje = document.getElementById(
        "mensajeFormulario"
    );

    if (mensaje) {
        mensaje.textContent =
            "¡Tu solicitud fue enviada con éxito!";

        mensaje.hidden = false;

        setTimeout(() => {
            mensaje.hidden = true;
        }, 4000);

        return;
    }

    alert("¡Tu solicitud fue enviada con éxito!");
}

if (formRegistro) {
    formRegistro.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!formRegistro.checkValidity()) {
            formRegistro.reportValidity();
            return;
        }

        guardarSolicitud();
        mostrarRegistros();
        formRegistro.reset();
        mostrarMensajeExito();
    });

    mostrarRegistros();
}