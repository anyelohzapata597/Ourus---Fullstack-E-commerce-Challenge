//var producto = {id:"-1", nombre:"Producto 1", precio:100000, descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", calificacion:4.5, imagen:"img/imagen_gris.png"};

//la funcion carga la informacion de un producto, y la muestra en las etiquetas correspondientess
document.addEventListener('DOMContentLoaded', function() {
	var objeto;
	var product;
	fetch('data/posts.json')
		.then(response => response.json())
		.then(data => {
			// Find the post with id 4 (equivalent to /posts/4)
			var postData = data.find(post => post.id === 4);
			localStorage.setItem("producto", JSON.stringify(postData));
			console.log(postData);

			objeto = localStorage.getItem('producto');
			product = JSON.parse(objeto);

			document.getElementById("div_nombre_producto").textContent = "Producto: " + product.title;
			document.getElementById("div_descripcion_producto").textContent = product.body;
			document.getElementById("img_producto").setAttribute("src", 'img/imagen_gris.png');
			document.getElementById("div_precio_producto").textContent = "Precio: " + product.userId;

			// La funcion añade la informacion de un producto al localstorage identificandolo como productoCarro
			document.getElementById("btn_añadir_carro").addEventListener("click", function(){
				localStorage.setItem("productoCarro", JSON.stringify(objeto));
			});

			// La funcion añade la informacion de un producto al localstorage identificandolo como productoDeseos
			document.getElementById("btn_anadir_deseos").addEventListener("click", function(){
				localStorage.setItem("productoDeseos", JSON.stringify(objeto));
			});

			document.getElementById("btn_comentar").addEventListener("click", function(){
				window.location.href = 'comentarios.html';
			});
		})
		.catch(error => console.error('Error loading product:', error));
});
