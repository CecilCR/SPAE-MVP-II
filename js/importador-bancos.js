/* =====================================================
   SPAE MVP
   BLOQUE 12A
   IMPORTADOR DE BANCOS JSON
===================================================== */

/* =====================================================
   IMPORTAR ARCHIVO JSON
===================================================== */

function importarBancoJSON(archivo){

    if(!archivo){

        alert("Seleccione un archivo JSON");

        return;
    }

    const lector = new FileReader();

    lector.onload = function(evento){

        try{

            const datos = JSON.parse(evento.target.result);

            if(!Array.isArray(datos)){

                throw new Error(
                    "El archivo no contiene un arreglo JSON válido."
                );

            }

            let agregadas = 0;

            datos.forEach(p=>{

                if(
                    p.id &&
                    p.tipo &&
                    p.contenido
                ){

                    BANCO_PREGUNTAS.push(p);

                    agregadas++;

                }

            });

            mostrarResultadoImportacion(
                agregadas,
                datos.length
            );

            console.log(
                "Importación completada:",
                agregadas
            );

        }
        catch(error){

            alert(
                "Error al importar archivo JSON"
            );

            console.error(error);

        }

    };

    lector.readAsText(archivo);

}

/* =====================================================
   RESULTADO
===================================================== */

function mostrarResultadoImportacion(
    agregadas,
    total
){

    const div =
    document.getElementById(
        "resultadoImportacion"
    );

    if(!div){
        return;
    }

    div.innerHTML = `

        <div class="notice">

            Preguntas detectadas: ${total}<br>

            Preguntas incorporadas: ${agregadas}

        </div>

    `;

}

/* =====================================================
   EXPORTAR BANCO ACTUAL
===================================================== */

function exportarBancoCompleto(){

    const blob = new Blob(

        [
            JSON.stringify(
                BANCO_PREGUNTAS,
                null,
                4
            )
        ],

        {
            type:
            "application/json;charset=utf-8"
        }

    );

    const enlace =
    document.createElement("a");

    enlace.href =
    URL.createObjectURL(blob);

    enlace.download =
    "banco-preguntas.json";

    enlace.click();

}
