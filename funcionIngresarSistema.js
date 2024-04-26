
            //usuarios precargados en el sistema
            var usuarios = [
                {documento: "dni", numeroDocumento: "44481078", contrasenia: "ceramica123!", email: "yael.machaique@gmail.com" },
                {documento: "cuit", numeroDocumento: "20345678901A", contrasenia: "password2!", email: "usuario2@example.com"},
            ];

            /**
             * Validar segun tipo documento y numero
             */
             function validarTipoDocumento(tipoDocumento,numeroDocumento) {
                var valido = false;
                //dni
                if (tipoDocumento === "dni") {
                    // Validación para DNI
                    if (numeroDocumento.length === 8 && !isNaN(numeroDocumento) && numeroDocumento>= 10000000 && numeroDocumento <= 99999999) {
                        valido = true;
                    }
                    //si es cuit
                } else if (tipoDocumento === "cuit") {
                    // Validación para CUIT
                     // Verificar que el número de CUIT tenga 11 dígitos y no contenga caracteres no numéricos
                    if (numeroDocumento.length === 11 && !isNaN(numeroDocumento)) {
                        // Calcular el dígito verificador
                        var multiplicadores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
                        var suma = 0;
                        for (var i = 0; i < multiplicadores.length; i++) {
                        suma += parseInt(numeroDocumento.charAt(i)) * multiplicadores[i];
                        }
                        var resto = suma % 11;
                        var digito_verificador = 11 - resto;
                        if (digito_verificador === 11) {
                        digito_verificador = 0;
                        } else if (digito_verificador === 10) {
                        return false; // El CUIT no es válido
                        }
                        // Verificar el dígito verificador
                        if (digito_verificador === parseInt(numeroDocumento.charAt(10))) {
                        valido = true; // El CUIT es válido
                        } else {
                        valido = false; // El CUIT no es válido
                        }
                    } else {
                        valido =  false; // El número de CUIT no es válido
                    }

                    }

                    return valido;
                }



            /**
             * Validar contraseña (Tenga minimo 8 carcateres)
             */
             function validarContrasenia(contrasenia) {
                var valido = false;
                var tieneNumero = false;
                var tieneCaracterEspecial = false;
                var caracteresEspeciales = ['!', '@', '#', '$', '%', '&'];

                if (contrasenia.length >= 8) {
                    for (var i = 0; i < contrasenia.length; i++) {
                    var caracter = contrasenia.charAt(i);
                    if (!isNaN(caracter)) {
                        tieneNumero = true;
                    } else if (caracteresEspeciales.includes(caracter)) {
                        tieneCaracterEspecial = true;
                    }
                    }
                    if (tieneNumero && tieneCaracterEspecial) {
                    valido = true;
                    }
                }

                return valido;
                }

                /**
                 * auntentica al usuario en el sistema con el arreglo de usuarios
                 */
                function autenticarUsuario(tipoDocumento, numeroDocumento, contrasenia) {
                    for (var i = 0; i < usuarios.length; i++) {
                        if (usuarios[i].documento === tipoDocumento && usuarios[i].numeroDocumento === numeroDocumento && usuarios[i].contrasenia === contrasenia) {
                            return true; // El usuario existe en el sistema
                        }
                    }
                    return false; // El usuario no existe en el sistema
                }


            function ingresarSistema(){
                var informacion = document.getElementById("informacion");

                var tipoDocumento = document.getElementById("documento");
                var numeroDocumento = document.getElementById("numeroDocumento");
                var contrasenia = document.getElementById("contrasenia");
                // var nroDocumentoValido = validarTipoDocumento(tipoDocumento.value,numeroDocumento.value);
                // var contraseniaValida = validarContrasenia(contrasenia.value);

                // Verificar si todos los campos están llenos
                if (tipoDocumento.value !== "" && numeroDocumento.value !== "" && contrasenia.value !== "") {
                    var nroDocumentoValido = validarTipoDocumento(tipoDocumento.value,numeroDocumento.value);
                    var contraseniaValida = validarContrasenia(contrasenia.value);

                    var validacion = true;

                    if(tipoDocumento.value === "tipo"){
                        tipoDocumento.style.border = "3px solid red";
                        validacion = false;
                    }else{
                        tipoDocumento.style.border = "3px solid green";
                    }


                    if(nroDocumentoValido){
                        numeroDocumento.style.border = "3px solid green";               
                    }else{
                        numeroDocumento.placeholder = "Ingrese nro documento";
                        numeroDocumento.style.border = "3px solid red";
                        validacion = false;
                    }

                    if(contraseniaValida){
                        contrasenia.style.border = "3px solid green";
                    } else {
                        contrasenia.placeholder = "Ingrese contraseña";
                        contrasenia.style.border = "3px solid red";
                        validacion = false;
                    }
                
                    var usuarioAutenticado = autenticarUsuario(tipoDocumento.value, numeroDocumento.value, contrasenia.value);


                    //validacion final
                    if (validacion && usuarioAutenticado) {
                        informacion.style.display = "block"; 
                        informacion.innerHTML = "Los datos ingresados son correctos!";

                        setTimeout(function() {
                            window.location.href = 'solicitarTurno.html';
                            }, 2000);

                        }else{
                            // Mostrar un mensaje de error al usuario
                            informacion.style.display = "block"; 
                            informacion.innerHTML = "Los datos ingresados no coinciden con ningún usuario registrado, pruebe con recuperar contraseña";
                            
                        }
                    
                    }else{
                         // Mostrar un mensaje de error al usuario
                        informacion.style.display = "block"; 
                        informacion.innerHTML = "Por favor, primero complete todos los campos.";
                    }
                }


                /**
                * autentica al usuario en el sistema con el arreglo de usuarios usando el correo electrónico
                */
                function autenticarUsuarioEmail(tipoDocumento, numeroDocumento, email) {
                    for (var i = 0; i < usuarios.length; i++) {
                        if (usuarios[i].documento === tipoDocumento && usuarios[i].numeroDocumento === numeroDocumento && usuarios[i].email === email) {
                            return true; // El usuario existe en el sistema
                        }
                    }
                    return false; // El usuario no existe en el sistema
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
 
               function recuperar(){
                var informacion = document.getElementById("informacion");

                var tipoDocumento = document.getElementById("documento");
                var numeroDocumento = document.getElementById("numeroDocumento");
                var email = document.getElementById("email");
                // var nroDocumentoValido = validarTipoDocumento(tipoDocumento.value,numeroDocumento.value);
                // var contraseniaValida = validarContrasenia(contrasenia.value);

                // Verificar si todos los campos están llenos
                if (tipoDocumento.value !== "" && numeroDocumento.value !== "" && email.value !== "") {
                    var nroDocumentoValido = validarTipoDocumento(tipoDocumento.value,numeroDocumento.value);
                    var emailValido = validarEmail(email.value);

                    var validacion = true;

                    if(tipoDocumento.value === "tipo"){
                        tipoDocumento.style.border = "3px solid red";
                        validacion = false;
                    }else{
                        tipoDocumento.style.border = "3px solid green";
                    }


                    if(nroDocumentoValido){
                        numeroDocumento.style.border = "3px solid green";               
                    }else{
                        numeroDocumento.placeholder = "Ingrese nro documento valido";
                        numeroDocumento.style.border = "3px solid red";
                        validacion = false;
                    }

                    if(emailValido){
                        email.style.border = "3px solid green";
                    } else {
                        email.placeholder = "Ingrese email valido";
                        email.style.border = "3px solid red";
                        validacion = false;
                    }
                
                    var usuarioAutenticado = autenticarUsuarioEmail(tipoDocumento.value, numeroDocumento.value, email.value);


                    //validacion final
                    if (validacion && usuarioAutenticado) {
                            alert("correcto!, datos enviados por correo");
                        }else{
                            // Mostrar un mensaje de error al usuario
                            informacion.style.display = "block"; 
                            informacion.innerHTML = "Los datos ingresados no coinciden con ningún usuario registrado.";
                            
                        }
                    
                    }else{
                         // Mostrar un mensaje de error al usuario
                        informacion.style.display = "block"; 
                        informacion.innerHTML = "Por favor, primero complete todos los campos.";
                    }
               }