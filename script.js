const productos = [
  { id: 1, title: 'Camiseta Oficial', price: 22000 },
  { id: 2, title: 'Gorra Roja', price: 8500 },
  { id: 3, title: 'Bufanda CAI', price: 6200 }
];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarProductos() {
  const contenedor = document.getElementById('contenedor-productos');
  contenedor.innerHTML = '';
  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${p.title}</h3><p>$${p.price}</p><button onclick='agregar(${p.id})'>Agregar</button>`;
    contenedor.appendChild(card);
  });
}

function agregar(id) {
  const producto = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const cont = document.getElementById('carrito-contenido');
  const contador = document.getElementById('contador');
  const total = document.getElementById('total');
  cont.innerHTML = '';
  let suma = 0;
  carrito.forEach(p => {
    suma += p.price * p.cantidad;
    cont.innerHTML += `<p>${p.title} x ${p.cantidad} - $${p.price * p.cantidad}</p>`;
  });
  contador.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  total.textContent = 'Total: $' + suma;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

mostrarProductos();
actualizarCarrito();
