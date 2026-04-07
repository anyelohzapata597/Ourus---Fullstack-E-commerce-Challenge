window.onload = init;

var comentar;

var vpostId;
var vid=0;
var vname;
var vemail;
var vbody;

function init()
{
	console.log("entra");
	comentar = document.getElementById("comentar");
	comentar.addEventListener("click",agregarComentario);

	fetch('data/comments.json')
		.then(response => response.json())
		.then(data => {
			vid = data.length + 1;
			console.log("entraaa");
		})
		.catch(error => console.error('Error loading comments:', error));

	mostrarDatos();
}

function agregarComentario()
{
	vpostId = 1;
	fetch('data/comments.json')
		.then(response => response.json())
		.then(data => {
			vid = data.length + 1;
		})
		.catch(error => console.error('Error loading comments:', error));

	vname = document.getElementById("tituloComentario").value;
	vemail = 'a@a.com'
	vbody = document.getElementById("comentario").value;

	// Simulate POST by storing in localStorage
	var newComment = {
		postId: vpostId,
		id: vid,
		name: vname,
		email: vemail,
		body: vbody
	};

	// Get existing comments from localStorage or initialize empty array
	var existingComments = JSON.parse(localStorage.getItem('userComments') || '[]');
	existingComments.push(newComment);
	localStorage.setItem('userComments', JSON.stringify(existingComments));

	console.log('Comment added:', newComment);

	// Refresh the display
	mostrarDatos();
}

function mostrarDatos()
{
	fetch('data/comments.json')
		.then(response => response.json())
		.then(data => {
			console.log(data);
			var codigo='';

			// Show original comments
			for (i = 0; i < data.length; i++) {
				codigo += "<tr> <td> <h4>Comentario"+i+": </h4> </td> <td>"+ data[i].name +" </td> </tr>";
				codigo += "<tr> <td>  </td>  <td>"+ data[i].body +" </td> </tr>";
			}

			// Show user-added comments from localStorage
			var userComments = JSON.parse(localStorage.getItem('userComments') || '[]');
			for (i = 0; i < userComments.length; i++) {
				codigo += "<tr> <td> <h4>Comentario Usuario"+i+": </h4> </td> <td>"+ userComments[i].name +" </td> </tr>";
				codigo += "<tr> <td>  </td>  <td>"+ userComments[i].body +" </td> </tr>";
			}

			document.getElementById("tabla").innerHTML = codigo;
		})
		.catch(error => console.error('Error loading comments:', error));
}
	});
}
