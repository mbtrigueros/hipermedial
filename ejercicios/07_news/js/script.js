const contenedorNoticias = document.querySelector("#news");
const botonAgregar = document.querySelector(".btn-agregar");
const inputTitulo = document.querySelector('input[name="titulo"]');

botonAgregar.addEventListener("click", alCliquear);
// botonAgregar.removeEventListener('click', alCliquear)

// Función anónima
// botonAgregar.addEventListener('click', function() {
//   const titulo = inputTitulo.value
//   agregarTitulo(titulo)

//   inputTitulo.value = ''
// })

// Arrow function
// botonAgregar.addEventListener('click', () => {
//   const titulo = inputTitulo.value
//   agregarTitulo(titulo)

//   inputTitulo.value = ''
// })

// agregarTitulo('No estoy muy creativo')

const noticia = document.querySelector("#news");

function agregarNoticia(titulo, img, descripcion) {
  const articulo = document.createElement("article");
  const title = document.createElement("h2");
  title.textContent = titulo;

  const image = document.createElement("img");
  image.src = img;
  image.alt = "Imagen sobre " + titulo;
  const description = document.createElement("p");
  description.textContent = descripcion;

  articulo.append(title);
  articulo.append(image);
  articulo.append(description);

  noticia.append(articulo);
}

function alCliquear() {
  agregarNoticia("Una Noticia", "img/profesor-x.jpg", "Esto es una noticia");
}
