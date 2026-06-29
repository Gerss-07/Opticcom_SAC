let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const tabla = document.getElementById("tabla-body");
function renderCarrito() {
    tabla.innerHTML = "";

    if (carrito.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:20px;">
                    Tu carrito está vacío
                </td>
            </tr>
        `;

        actualizarTotal();
        actualizarContador();
        return;
    }

    carrito.forEach((item, index) => {

        let precio = Number(item.precio) || 0;
        let cantidad = Number(item.cantidad) || 1;
        let subtotal = precio * cantidad;

        tabla.innerHTML += `
        <tr>
            <td><button onclick="eliminar(${index})">X</button></td>
            <td><img src="${item.imagen}" width="60"></td>
            <td>${item.nombre}</td>
            <td>S/ ${precio.toFixed(2)}</td>
            <td>
                <button onclick="disminuir(${index})">-</button>
                ${cantidad}
                <button onclick="aumentar(${index})">+</button>
            </td>
            <td>S/ ${subtotal.toFixed(2)}</td>
        </tr>
        `;
    });

    actualizarTotal();
    actualizarContador();
}

function eliminar(index) {
    carrito.splice(index, 1);
    guardar();
}

function aumentar(index) {
    carrito[index].cantidad = (Number(carrito[index].cantidad) || 1) + 1;
    guardar();
}

function disminuir(index) {
    carrito[index].cantidad = Number(carrito[index].cantidad) || 1;
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
    } else {
        carrito.splice(index, 1);
    }

    guardar();
}

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

function actualizarTotal() {
    let total = carrito.reduce((sum, item) => {
        let precio = Number(item.precio) || 0;
        let cantidad = Number(item.cantidad) || 1;
        return sum + (precio * cantidad);
    }, 0);
    document.getElementById("cart-total-display").innerText = total.toFixed(2);
    document.getElementById("cart-total-display-final").innerText = total.toFixed(2);
}

function actualizarContador() {
    const contador = document.getElementById("carrito-contador");
    if (contador) {
        let totalItems = carrito.reduce((sum, item) => {
            return sum + (Number(item.cantidad) || 1);
        }, 0);
        contador.textContent = totalItems;
    }
}

renderCarrito();