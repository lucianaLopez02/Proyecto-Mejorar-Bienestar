/**
 * Validar que el nombre y el apellido sea de tipo texto
 */
function validarNombreApe(nomApe){
  var valido = false;

  if (isNaN(nomApe)) {
      var palabras = nomApe.trim().split(' ');
      if (palabras.length === 2 && palabras[0].length >= 3) {
          valido = true;
      }
  }

  return valido;
}

/**
* Validar correo electronico
*/
function validarEmail(email) {
  var valido = false;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    valido = true;
  }

  return valido;
}
/**
* validar telefono
*/
  function validarTelefono(telefono) {
    var valido = false;
  
    /* Verificar que el teléfono empiece con "299", 
    * ademas de verificar que el teléfono tenga al menos 7 caracteres después de "299"
    */
    if (telefono.startsWith("299") && telefono.length >= 10) {

    // Verificar que todos los caracteres después de "299" sean dígitos numéricos
    var digits = telefono.slice(3); // Obtener los dígitos después de "299"
    for (var i = 0; i < digits.length; i++) {
      if (isNaN(Number(digits[i]))) {
        valido = false;
        break;
      }else{
        valido = true;
      }
    }

    }
  
    return valido;
  }


  function validarConsulta(){
    var informacion = document.getElementById("informacion");

    var nombreApellido = document.getElementById("nomApe");
    var esValidoNomApe = validarNombreApe(nombreApellido.value);
    var email = document.getElementById("email");
    var esValidoEmail = validarEmail(email.value);
    var telefono = document.getElementById("telefono");
    var esValidoTelefono = validarTelefono(telefono.value);
    var mensaje = document.getElementById("mensaje");
    var esValidoMensaje = isNaN(mensaje.value) &&  mensaje.value !== ""; 

    var validacion = esValidoNomApe && esValidoMensaje && esValidoTelefono && esValidoEmail;

    if (validacion) {
      informacion.style.display = "block"; // Mostrar el div "informacion"
      informacion.innerHTML = "¡Gracias por enviar su consulta! Le estaremos respondiendo pronto.";
    } else {
      informacion.style.display = "block"; // Mostrar el div "informacion"
      informacion.innerHTML = "Por favor tenga en cuenta que:<br><ul><li>* Nombre y Apellido sean válidos (No se aceptan valores numéricos).</li>"+
      "<li>* Correo Electrónico tiene que tener @ y dominio válido. </li> "+"<li>* Teléfono solo recibe valores numéricos y empiece con 299.</li>"+
      "<li>* Mensaje que no empieza con numeros y no este vacio</li></ul>"
    }
}

