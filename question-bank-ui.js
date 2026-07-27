/* =====================================================

SPAE MVP

BLOQUE 9B

MÓDULO BANCO DE PREGUNTAS

question-bank-ui.js


Responsabilidades:

- Renderizar panel Banco de preguntas
- Mostrar preguntas disponibles
- Buscar
- Filtrar
- Importar preguntas


===================================================== */







/* =====================================================
   RENDER PRINCIPAL BANCO PREGUNTAS
===================================================== */


function renderBancoPreguntas(){



return `



<section class="card">



<h2>

7. Banco de preguntas

</h2>




<p>

Repositorio externo de preguntas para reutilización.

</p>





<hr>





<button onclick="actualizarVistaBanco()">

Cargar banco

</button>





<br><br>





<label>

Buscar pregunta

</label>




<input

id="buscarBanco"

placeholder="Ingrese texto de búsqueda"

onkeyup="buscarEnBancoUI()"

>







<label>

Filtrar tipo

</label>




<select

id="filtroTipoBanco"

onchange="filtrarBancoUI()"

>



<option value="todos">

Todas

</option>



<option value="opcion_multiple">

Opción múltiple

</option>



<option value="caso_analisis">

Caso análisis

</option>



<option value="caso_aplicacion">

Caso aplicación

</option>



<option value="abierta">

Pregunta abierta

</option>



</select>







<div id="resumenBanco">



</div>






<hr>





<div id="listaBancoPreguntas">



<p>

Presione "Cargar banco".

</p>



</div>





</section>



`;

}









/* =====================================================
   ACTUALIZAR VISTA BANCO
===================================================== */


async function actualizarVistaBanco(){



if(

typeof cargarBancoPreguntasJSON === "function"

){



await cargarBancoPreguntasJSON();



}



renderListaBancoUI();



}









/* =====================================================
   LISTADO BANCO
===================================================== */


function renderListaBancoUI(){



const contenedor =

document.getElementById(

"listaBancoPreguntas"

);





const resumen =

document.getElementById(

"resumenBanco"

);






if(!contenedor){

return;

}






let banco=[];






if(

typeof obtenerBancoPreguntas==="function"

){


banco = obtenerBancoPreguntas();


}







if(resumen){



resumen.innerHTML = `



<p>

Preguntas disponibles:

<strong>

${banco.length}

</strong>

</p>



`;



}








if(

banco.length===0

){



contenedor.innerHTML = `



<div class="notice">


<p>

No existen preguntas en el banco.

</p>


</div>



`;



return;



}








contenedor.innerHTML =



banco.map(

(p,index)=>{



return `



<div class="card">



<h3>

Pregunta ${index+1}

</h3>





<p>

<strong>

Tipo:

</strong>


${nombreTipoPreguntaBanco(p.tipo)}

</p>






<p>

<strong>

Nivel:

</strong>


${p.nivelCognitivo || "-"}

</p>







<p>

${

p.contenido ||

p.contexto ||

"No disponible"

}

</p>








<button onclick="importarDesdeBancoUI('${p.id}')">

Importar al examen

</button>





</div>



`;



}

).join("");



}









/* =====================================================
   BUSCADOR
===================================================== */


function buscarEnBancoUI(){



const texto =

document.getElementById(

"buscarBanco"

)

.value;







let resultado=[];






if(

typeof buscarPreguntasBanco==="function"

){



resultado =

buscarPreguntasBanco(texto);



}






mostrarResultadoBancoUI(resultado);



}









/* =====================================================
   FILTRO TIPO
===================================================== */


function filtrarBancoUI(){



const tipo =

document.getElementById(

"filtroTipoBanco"

).value;








let resultado=[];





if(

typeof filtrarBancoPorTipo==="function"

){



resultado =

filtrarBancoPorTipo(tipo);



}






mostrarResultadoBancoUI(resultado);



}









/* =====================================================
   MOSTRAR RESULTADOS
===================================================== */


function mostrarResultadoBancoUI(lista){



const contenedor =

document.getElementById(

"listaBancoPreguntas"

);





if(!contenedor){

return;

}





if(

lista.length===0

){



contenedor.innerHTML = `



<div class="notice">

<p>

No se encontraron preguntas.

</p>

</div>



`;



return;



}








contenedor.innerHTML =



lista.map(

(p,index)=>{



return `



<div class="card">



<h3>

Pregunta ${index+1}

</h3>





<p>

<strong>

Tipo:

</strong>

${nombreTipoPreguntaBanco(p.tipo)}

</p>





<p>

${

p.contenido ||

p.contexto ||

"-"

}

</p>





<button onclick="importarDesdeBancoUI('${p.id}')">

Importar

</button>




</div>



`;



}

).join("");



}









/* =====================================================
   IMPORTAR DESDE INTERFAZ
===================================================== */


function importarDesdeBancoUI(id){



if(

typeof importarPreguntaBanco==="function"

){



const resultado =

importarPreguntaBanco(id);






if(resultado){



alert(

"Pregunta importada correctamente."

);





}

else{


alert(

"No se pudo importar la pregunta."

);



}



}





}









/* =====================================================
   NOMBRE TIPO
===================================================== */


function nombreTipoPreguntaBanco(tipo){



const tipos={



"opcion_multiple":

"Opción múltiple",



"caso_analisis":

"Caso de análisis",



"caso_aplicacion":

"Caso de aplicación",



"abierta":

"Pregunta abierta"



};






return tipos[tipo] || tipo;



}








/* =====================================================
   FIN MODULE

===================================================== */
