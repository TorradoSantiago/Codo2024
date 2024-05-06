// ACCEDER AL HTML POR MEDIO DEL DOM PARA AGREGAR TARJETAS DE PRODUCTOS DINAMICAMENTE EN EL CONTENEDOR.
let contenedor = document.querySelector('.contenedor');
let i=0;
while(i++<=7){
    let card=document.createElement('div');
    card.setAttribute('data-aos', 'zoom-in');
    card.setAttribute('data-aos-duration', '700');
    card.innerHTML=`<div class="card card1">
                        <img src="assets/images/tarjetas/prod${i}.png" alt="Imagen ${i}" class="card-img">
                        <div class="card-content">
                            <h3 class="card-title">Producto ${i}</h3>
                            <p class="card-description">Descripción breve del producto.</p>
                            <p class="card-price">$50</p>
                            <a href="#" class="card-btn">Ver más</a>
                        </div>
                    </div>
                        `;
    contenedor.appendChild(card);
}