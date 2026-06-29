let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function actualizarContador() {
    const contador = document.getElementById("carrito-contador");
    if (contador) {
        let totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = totalItems;
    }
}
function agregarAlCarrito(nombre, precio, imagen) {
    let productoExistente=carrito.find(item => item.nombre===nombre);
    if (productoExistente) {
        productoExistente.cantidad+=1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    mostrarMensajeExito();
}

document.addEventListener("DOMContentLoaded",() => {
    actualizarContador();
    const botones=document.querySelectorAll(".btn-carrito");
    botones.forEach((btn) => {
        btn.addEventListener("click",() =>{
            const card=btn.closest(".producto-card");
            const nombre=card.querySelector("h3").innerText;
            const precioTexto=card.querySelector(".producto-precio").innerText;
            const imagen=card.querySelector("img").src;
            const precio=parseFloat(precioTexto.replace("S/", "").trim());
            agregarAlCarrito(nombre,precio,imagen);
        });
    });

});

function mostrarMensajeExito() {
    const alertaPrevia = document.getElementById('alerta-carrito-simple');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }
    const alerta = document.createElement('div');
    alerta.id = 'alerta-carrito-simple';
    alerta.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3 shadow';
    alerta.style.zIndex = '9999';
    alerta.innerHTML = `
        <strong>Producto agregado exitosamente.</strong>
        <a href="carro.html" class="btn btn-success btn-sm ms-3">
            Ver carrito
        </a>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    `;

    document.body.appendChild(alerta);

    setTimeout(() => {
        const alertaActual = document.getElementById('alerta-carrito-simple');
        if (alertaActual) {
            alertaActual.remove();
        }
    }, 4000);
}