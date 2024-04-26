
            function calcularResultado(respuestas){
            var totalRespuestas = 0;
            var totalSi = 0;
            var totalNo = 0;
            var totalNose = 0;

            // Calcular la cantidad de respuestas "si", "no" y "nose"
            for (var i = 1; i <= 7; i++) { //5
                var respuesta = respuestas['resp' + i];
                if (respuesta == 'si') {
                totalRespuestas += 1;
                totalSi += 1;
                } else if (respuesta == 'no') {
                totalRespuestas += 1;
                totalNo += 1;
                } else if (respuesta == 'nose') {
                totalRespuestas += 1;
                totalNose += 1;
                }
            }

            // Determinar el diagnóstico basado en la cantidad de respuestas
            if (totalSi > totalNo && totalSi > totalNose) {
                var diagnosis = 'Tiene el trastorno';
            } else if (totalNo > totalSi && totalNo > totalNose) {
                var diagnosis = 'No tiene el trastorno';
            } else if (totalNose > totalSi && totalNose > totalNo) {
                var diagnosis = 'No estás seguro/a, se requiere más información para determinar si tienes el trastorno';
            } else {
                var diagnosis = 'No se puede determinar con certeza si tienes el trastorno';
            }


            return diagnosis;
            }

            function redirigir() {
            var preguntas = document.getElementsByClassName('pregunta');
            var todasLasPreguntasRespondidas = true;
            var respuestas = {};  

            for (var i = 0; i < preguntas.length; i++) {
                var radios = preguntas[i].getElementsByTagName('input');
                var algunaOpcionSeleccionada = false;

                for (var j = 0; j < radios.length; j++) {
                if (radios[j].checked) {
                    algunaOpcionSeleccionada = true;
                    respuestas['resp' + (i+1)] = radios[j].value;
                    break;
                }
                }

                if (!algunaOpcionSeleccionada) {
                todasLasPreguntasRespondidas = false;
                break;
                }
            }

            if (todasLasPreguntasRespondidas) {
                var resultadoFinal = calcularResultado(respuestas);

                var divFlotante = document.getElementById("flotante");
                divFlotante.style.display = "block";
                var textResultado = document.getElementById("resultado");
                textResultado.innerHTML = resultadoFinal;

                setTimeout(function() {
                window.location.href = 'diagnosticos.html';
                }, 5000);

            } else {
                var informacion = document.getElementById("informacion");
                informacion.style.display = "block";
                informacion.innerHTML = "Por favor, selecciona una opción para cada pregunta antes de continuar.";
            }

            }
        