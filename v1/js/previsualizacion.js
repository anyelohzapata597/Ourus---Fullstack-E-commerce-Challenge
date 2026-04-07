//definicion de variables
document.addEventListener('DOMContentLoaded', function () {
	fetch('data/posts.json')
		.then(response => response.json())
		.then(response => {
			var precioArticulos = 0;
			var precioTotal = 0;
			for(var i=0; i < response.length;i++){
				precioArticulos += response[i].id;
				var tr = '<tr><td>';
				tr += '<h3><a href="">'+response[i].id+'</a></h3>';
				tr += '<p>Codigo:'+response[i].userId+'</p> </td>';
				tr += '<td> <p>'+response[i].precio+'</p> </td>';
				tr += '<td>'+response[i].cantidad+'</td>';
				tr += '<td> <p>'+response[i].cantidad*response[i].precio+'</p> </td></tr>';
				document.getElementById("articulos").insertAdjacentHTML('beforeend', tr);
			}

			document.getElementById("precioArticulos").textContent = precioArticulos;
			document.getElementById("precioTotal").textContent = precioArticulos+precioArticulos*0.19;
			document.getElementById("costoEnvio").textContent = parseInt(Math.random() * (10000 - 0));
		})
		.catch(error => console.error('Error loading posts:', error));
	console.log("Prueba");
});
