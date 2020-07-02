const formulario = document.getElementById('form-auto');
const resultado = document.querySelector('.resultado');
const boton = document.querySelector('.boton');

class Ventana{
    precio;

    constructor(modelo, anio, seguro){
        this.modelo = modelo;
        this.anio = anio;
        this.seguro = seguro;
    }

    CotizaSeguro(){
        const base = 2000;

        // dependiendo el modelo del auto
        switch(this.modelo){
            case 'Americano':
                this.precio = base * 1.15;
                break;
            case 'Europeo':
                this.precio = base * 1.05;
                break;
            case 'Asiatico':
                this.precio = base * 1.35;
                break; 
        }

        // dependiendo el año del auto
        const dif = new Date().getFullYear() - this.anio;
        this.precio -= ((dif * 3) * this.precio) / 100;

        // dependiendo el seguro basico - 30% , completo 50%
        if(this.seguro === 'Basico'){
            this.precio *= 1.30;
        }
        else{
            this.precio *= 1.50;
        }

        return this.precio;
    }

    AgregaTarjeta(){
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card my-3">
                <div class="card-header">
                    <h4 class="mb-0 text-center">Tu resumen:</h4>
                </div>
                <div class="card-body text-center">
                    <p class="card-text">Marca: ${this.modelo}</p>
                    <p class="card-text">Año: ${this.anio}</p>
                    <p class="card-text">Tipo de seguro: ${this.seguro}</p>
                    <p class="card-text">Costo: $${this.CotizaSeguro()}</p>
                </div>
            </div>
        `;
        resultado.appendChild(div);
        formulario.reset();
    }

}


// Eventos del DOM

formulario.addEventListener('submit', EnviarDatos);

function EnviarDatos(e){
    e.preventDefault();

    // eliminamos el resultado anterior
    const card = document.querySelector('#result div');
    if(card != null){
        card.remove();
    }

    const modelo = document.getElementById('countries').value;
    const anio = document.getElementById('years').value;
    const seguro = document.getElementsByName('seguro');
    let seguro_escogido = '';

    for(i=0; i<seguro.length; i++){
        if(seguro[i].checked){
            seguro_escogido = seguro[i].value;
        }
    }

    tarjeta = new Ventana(modelo,anio,seguro_escogido);

    if(modelo === '0' || anio === '0' || seguro_escogido === ''){
        alert('Todos los campos deben estar llenos');
    }
    else{
        const boton_original = document.getElementById('btn-cotizar');
        boton.removeChild(boton_original);
        const nuevo_btn = document.createElement('button');
        nuevo_btn.innerHTML = `
            <button class="btn btn-primary" disabled>
                <span class="spinner-border spinner-border-sm"></span>
                Cotizando...
            </button>
            `;
        boton.appendChild(nuevo_btn);
        setTimeout(function(){
            boton.removeChild(nuevo_btn);
            //tarjeta.CotizaSeguro();
            tarjeta.AgregaTarjeta();
            boton.appendChild(boton_original);
        },3000);

    }

}
