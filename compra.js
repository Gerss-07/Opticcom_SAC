let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function convertirPrecio(valor) {
    if (typeof valor === "number") {
        return valor;
    }
    if (!valor) {
        return 0;
    }
    const limpio = String(valor)
        .replace("S/", "")
        .replace("S /", "")
        .replace("S", "")
        .replace("/", "")
        .replace(",", ".")
        .trim();
    return parseFloat(limpio) || 0;
}

function renderResumenCompra() {
    const contenedor=document.getElementById("resumen-productos");
    const subtotalSpan=document.getElementById("resumen-subtotal");
    const totalSpan=document.getElementById("resumen-total");
    contenedor.innerHTML="";
    if (carrito.length===0) {
        contenedor.innerHTML = `
            <p class="text-muted">No hay productos en el carrito.</p>
        `;
        subtotalSpan.textContent = "0.00";
        totalSpan.textContent = "0.00";
        return;
    }
    let total = 0;
    carrito.forEach(item => {
        const precio = convertirPrecio(item.precio);
        const cantidad = Number(item.cantidad) || 1;
        const subtotal = precio * cantidad;
        total += subtotal;
        contenedor.innerHTML += `
            <div class="resumen-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="resumen-item-info">
                    <h6>${item.nombre}</h6>
                    <p>${cantidad} x S/ ${precio.toFixed(2)}</p>
                </div>
            </div>
        `;
    });

    subtotalSpan.textContent = total.toFixed(2);
    totalSpan.textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
    renderResumenCompra();
    const btnVolverEntrega=document.getElementById("btnVolverEntrega");
    const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
    const seccionEntrega = document.getElementById("seccion-entrega");
    const seccionPago=document.getElementById("seccion-pago");
    const pasoEntrega = document.getElementById("paso-entrega");
    const pasoPago = document.getElementById("paso-pago");
    const lineaPasos = document.getElementById("linea-pasos");
    const formEntrega = document.getElementById("seccion-entrega");
    formEntrega.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!formEntrega.checkValidity()) {
            e.stopPropagation();
            formEntrega.classList.add("was-validated");
            return;
        }

        seccionEntrega.classList.add("d-none");
        seccionPago.classList.remove("d-none");
        pasoEntrega.classList.remove("activo");
        pasoPago.classList.add("activo");
        lineaPasos.classList.add("activa");
    });

    btnVolverEntrega.addEventListener("click", () => {
        seccionPago.classList.add("d-none");
        seccionEntrega.classList.remove("d-none");
        pasoPago.classList.remove("activo");
        pasoEntrega.classList.add("activo");
        lineaPasos.classList.remove("activa");
    });

    btnFinalizarCompra.addEventListener("click", () => {
        const alertaCompra = document.getElementById("alertaCompraExitosa");
        alertaCompra.classList.remove("d-none");
        localStorage.removeItem("carrito");
        setTimeout(() => {
            window.location.href = "tienda.html";
        }, 5000);
    });
});