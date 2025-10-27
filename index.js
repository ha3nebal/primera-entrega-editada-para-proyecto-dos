const pescadosDisponibles = [
    { nombre: "Salmón", precioPorKg: 15.00 },
    { nombre: "Albacora", precioPorKg: 12.00 },
    { nombre: "Merluza Austral", precioPorKg: 18.00 },
    { nombre: "Congrio", precioPorKg: 10.00 }
];

const carrito = [];

// Variables para el flujo del programa
let totalFinal = 0;
let deseaContinuar = true;
const descuentoUmbral = 50.00; 
const porcentajeDescuento = 0.20;


function mostrarMenu() {
    console.log("--- MENÚ DE PESCADOS ---");
    for (let i = 0; i < pescadosDisponibles.length; i++) {
        const pescado = pescadosDisponibles[i];
        console.log(`${i + 1}. ${pescado.nombre} - ${pescado.precioPorKg.toFixed(2)} / Kg`);
    }
    console.log("--------------------------");
}

function comprarPescado() {
    
    let opcionStr = prompt("Ingrese el número del pescado que desea comprar (1-4):");
    let opcion = parseInt(opcionStr);

    if (opcion >= 1 && opcion <= pescadosDisponibles.length) {
        const indicePescado = opcion - 1;
        const pescadoSeleccionado = pescadosDisponibles[indicePescado];

        let kilosStr = prompt(`Ingrese la cantidad de kilos de ${pescadoSeleccionado.nombre}:`);
        let kilos = parseFloat(kilosStr);

        if (kilos > 0) {
           
            let subtotal = kilos * pescadoSeleccionado.precioPorKg;
            
            carrito.push({
                nombre: pescadoSeleccionado.nombre,
                kilos: kilos,
                subtotal: subtotal
            });

            console.log(`Agregado: ${kilos.toFixed(2)} Kg de ${pescadoSeleccionado.nombre} por ${subtotal.toFixed(2)}.`);
        } else {
            console.log("Cantidad de kilos inválida.");
        }
    } else {
        console.log("Opción de pescado inválida.");
    }
}

function finalizarCompra() {
    let subtotalCompra = 0;

    console.log("\n--- DETALLE DE SU PEDIDO ---");

    for (const item of carrito) {
        console.log(`- ${item.nombre}: ${item.kilos.toFixed(2)} Kg x ${(item.subtotal / item.kilos).toFixed(2)} = ${item.subtotal.toFixed(2)}`);
        subtotalCompra += item.subtotal;
    }

    console.log(`\nSUBTOTAL: ${subtotalCompra.toFixed(2)}`);
    
    let descuentoAplicado = 0;

    if (subtotalCompra >= descuentoUmbral) {
        descuentoAplicado = subtotalCompra * porcentajeDescuento;
        totalFinal = subtotalCompra - descuentoAplicado;
        
        console.log(`¡FELICIDADES! Aplicamos un ${porcentajeDescuento * 100}% de descuento por superar los ${descuentoUmbral.toFixed(2)}.`);
        console.log(`DESCUENTO: -$${descuentoAplicado.toFixed(2)}`);
    } else {
        totalFinal = subtotalCompra;
        console.log(`Monto restante para descuento (${descuentoUmbral.toFixed(2)}):${(descuentoUmbral - subtotalCompra).toFixed(2)}`);
    }

    console.log(`===========================`);
    console.log(`TOTAL A PAGAR: ${totalFinal.toFixed(2)}`);
    console.log(`===========================`);
    alert(`El total de su compra es: ${totalFinal.toFixed(2)}. ¡Gracias por su compra!`);
}


console.log("BIENVENIDO AL SIMULADOR DE VENTA DE PESCADOS ");

while (deseaContinuar) {
    mostrarMenu();
    comprarPescado(); 
    
    let respuesta = prompt("¿Desea agregar otro pescado? (Sí/No)").toLowerCase();
    
    if (respuesta !== "si" && respuesta !== "sí") {
        deseaContinuar = false;
    }
}

if (carrito.length > 0) {
    finalizarCompra();
} else {
    console.log("El carrito está vacío. ¡Esperamos verte pronto!")
};