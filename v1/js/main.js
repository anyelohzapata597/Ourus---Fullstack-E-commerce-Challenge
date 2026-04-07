document.addEventListener('DOMContentLoaded', function() {

    //var seccion_inicio = document.getElementById("seccion_inicio");
    //var seccion_registro = document.getElementById("seccion_registro");
    //var seccion_principal = document.getElementById("seccion_principal");

    var btn_registrar;
    var btn_login;
    var btn_registro;

    var mail_login;
    var username_login;

    var id;
    var nombre;
    var username;
    var mail;
    var telefono;
    var sitio_web;
    var calle;
    var num_apartamento;
    var ciudad;
    var codigo_postal;
    var latitud;
    var longitud;
    var nombre_compania;
    var lema;
    var bs;
    var json_doc;

    var form_registro;

    fetch('data/users.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("usuarios_data", JSON.stringify(data));
        })
        .catch(error => console.error('Error loading users:', error));

    document.getElementById("btn_registro").addEventListener("click", function(){
        document.getElementById("seccion_registro").style.display = "block";
        document.getElementById("seccion_inicio").style.display = "none";
    });

    document.getElementById("btn_login").addEventListener("click", function () {

        username_login = document.getElementById("txtusername_login").value;
        mail_login = document.getElementById("txtmail_login").value;

        var data = JSON.parse(localStorage.getItem("usuarios_data"));

        if (username_login!="" && mail_login !="") {
            for(var i in data){
                if (data[i].username == username_login) {
                    console.log(data[i].username);
                    if (data[i].email == mail_login) {
                        console.log(data[i].email);
                        console.log("Estas logeado");
                        document.getElementById("seccion_principal").style.display = "block";
                        document.getElementById("seccion_inicio").style.display = "none";
                    }
                }
            }
        }
        else{
            alert("Ingresa todos los datos");
        }
    });

    document.getElementById("btn_registrar").addEventListener("click", function () {

        var usuarios = JSON.parse(localStorage.getItem("usuarios_data"));
        console.log(usuarios);

        id = usuarios.length + 1;
        nombre = document.getElementById("txtnombre").value;
        username = document.getElementById("txtusername").value;
        mail = document.getElementById("txtmail").value;
        telefono = document.getElementById("txttelefono").value;
        sitio_web = document.getElementById("txtsitio_web").value;
        calle = document.getElementById("txtcalle").value;
        num_apartamento = document.getElementById("txtnum_apartamento").value;
        ciudad = document.getElementById("txtciudad").value;
        codigo_postal = document.getElementById("txtcodigo_postal").value;
        latitud = document.getElementById("txtlatitud").value;
        longitud = document.getElementById("txtlongitud").value;
        nombre_compania = document.getElementById("txtnombre_compania").value;
        lema = document.getElementById("txtlema").value;
        bs = document.getElementById("txtbs").value;

        if (id!="" && nombre!="" && username!="" && mail!= "" && telefono!= "" && sitio_web!= "" && calle!= "" && num_apartamento!= "" && ciudad!= "" && codigo_postal!= "" && latitud!= "" && longitud!= "" && nombre_compania!= "" && lema!= "" && bs!= "") {
            var usuario = {};
            usuario.id = id;
            usuario.name = nombre;
            usuario.username = username,
            usuario.email =  mail;
            var address = {};
            address.street = calle;
            address.suite = num_apartamento;
            address.city = ciudad;
            address.zipcode = codigo_postal;
            var geo = {};
            geo.lat = latitud;
            geo.lng = longitud;
            address.geo=geo;
            usuario.address=address;
            usuario.phone = telefono;
            usuario.website = sitio_web;
            var company={};
            company.name = nombre_compania;
            company.catchPhrase = lema;
            company.bs = bs;
            usuario.company=company;
            console.log(usuario);

            usuarios.push(usuario);
            localStorage.setItem("usuarios_data", JSON.stringify(usuarios));

            var usuarios_ls = JSON.parse(localStorage.getItem("usuarios_data"));
            console.log(usuarios_ls);
            document.getElementById("seccion_inicio").style.display = "block";
            document.getElementById("seccion_registro").style.display = "none";
        }
        else{
            alert("Ingresa todos los datos");
        }
    });
});

  



  
