var a =  new Array();
    a[0]=["Inss","300000","Machaique Yael","Lanin 380",29950212540];
    a[1]=["Osde","300000","Lopez Susana","Lanin 380",29950212540]; 
    a[2]=["Osde","300000","Machaique Yael","Lanin 380",29950212540]; 
    a[3]=["Crediguia","300000","Juan Perez","Lanin 380",29950212540]; 
    a[4]=["Medife","300000","Mara","Lanin 380",29950212540];

function insertarRow(Obra,Matricula,ApellidoNombre,Direccion,Telefono){
    var tabla=document.getElementById("tablaProfesionales");
    var row=tabla.insertRow(tabla.rows.length);
    var cel0=row.insertCell(0);
    var cel1=row.insertCell(1);
    var cel2=row.insertCell(2);
    var cel3=row.insertCell(3);
    var cel4=row.insertCell(4);

    cel0.innerHTML = Obra;
    cel1.innerHTML = Matricula;
    cel2.innerHTML = ApellidoNombre;
    cel3.innerHTML = Direccion;
    cel4.innerHTML = Telefono;
}

function llenarTabla(){
    

    var tabla=document.getElementById("tablaProfesionales");
    for(i in a){
        insertarRow(a[i][0],a[i][1],a[i][2],a[i][3],a[i][4]);
    }
}

function buscarPorNombre(nombreProfesional) {
    var tablaProfesionales = document.getElementById("tablaProfesionales");

    // Vaciar la tabla
    while (tablaProfesionales.rows.length > 1) {
        tablaProfesionales.deleteRow(1);
    }

    // Verificar si el nombre del profesional está vacío
    if (nombreProfesional.trim() === "") {
        return; // No hacer nada si el campo de búsqueda está vacío
    }


    // Filtrar y mostrar los profesionales correspondientes
    for (var i = 0; i < a.length; i++) {
        var nombreCompleto = a[i][2].toLowerCase();
        if (nombreCompleto.includes(nombreProfesional)) {
            insertarRow(a[i][0], a[i][1], a[i][2], a[i][3], a[i][4]);
        }
    }
}

function buscarProfesionalNombre() {
    var nombreProfesional = document.getElementById("nombreProfesional").value.toLowerCase();
    buscarPorNombre(nombreProfesional);
}

function buscarProfesional() {

    var obra_social = document.getElementById("obras").value;
    var tabla = document.getElementById("tablaProfesionales");

    // Vaciar la tabla
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    // filas que corresponde a la obra social seleccionada
    for (var i = 0; i < a.length; i++) {
        if (a[i][0] == obra_social) {
            insertarRow(a[i][0], a[i][1], a[i][2], a[i][3], a[i][4]);
        }
    }
}