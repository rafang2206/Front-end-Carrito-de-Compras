const carrito = document.querySelector('#carrito');
const contenidoCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

listarEventos();
function listarEventos(){
    listaCursos.addEventListener('click', agregarCarrito);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', e => {
        articulosCarrito = [];
        carritoHtml();
    });
}

function agregarCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        leerCurso(curso);
    }
}

function leerCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    
    articulosCarrito.push(infoCurso);
    carritoHtml();
}

function carritoHtml(){
    limpiarHtml();
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;

        contenidoCarrito.appendChild(row);

    })
}

function limpiarHtml(){
    contenidoCarrito.innerHTML = "";
}

function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHtml();
    }
}