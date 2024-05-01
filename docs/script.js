var Cfecha = /** @class */ (function () {
    function Cfecha(dia, mes, año) {
        this.dia = dia;
        this.mes = mes;
        this.año = año;
    }
    Cfecha.prototype.esFechaValida = function () {
        var fecha = new Date(this.año, this.mes - 1, this.dia);
        return (fecha.getFullYear() === this.año &&
            fecha.getMonth() === this.mes - 1 &&
            fecha.getDate() === this.dia);
    };
    return Cfecha;
}());
function generarClave() {
    var nombre = document.getElementById('nombre').value.trim().toUpperCase();
    var ap_paterno = document.getElementById('ap_paterno').value.trim().toUpperCase();
    var ap_materno = document.getElementById('ap_materno').value.trim().toUpperCase();
    var fecha_nacimiento = document.getElementById('fecha_nacimiento').value.trim();
    var fechaParts = fecha_nacimiento.split('-').map(function (part) { return parseInt(part); });
    var fecha = new Cfecha(fechaParts[2], fechaParts[1], fechaParts[0]);
    if (!fecha.esFechaValida()) {
        alert("La fecha de nacimiento ingresada no es válida.");
        return;
    }
    var claveAlfabetica = generarClaveAlfabetica(nombre, ap_paterno, ap_materno);
    var claveNumerica = generarClaveNumerica(fecha_nacimiento);
    var resultado = "".concat(claveAlfabetica, " ").concat(claveNumerica);
    document.getElementById('resultado').innerText = resultado;
}
function generarClaveAlfabetica(nombre, ap_paterno, ap_materno) {
    var clave = "";
    // Regla 1: Integrar la clave alfabética
    clave += ap_paterno[0]; // Primera letra del apellido paterno
    clave += obtenerSiguienteVocal(ap_paterno); // Siguiente vocal del apellido paterno
    clave += ap_materno[0]; // Primera letra del apellido materno
    if (nombre.includes("MARIA") || nombre.includes("JOSE")) {
        // Si el nombre es María o José, se toma la primera letra de la segunda palabra
        var palabras = nombre.split(" ");
        clave += palabras[1][0];
    }
    else {
        clave += nombre[0]; // Primera letra del nombre
    }
    return clave;
}
function obtenerSiguienteVocal(apellido) {
    var vocales = ['A', 'E', 'I', 'O', 'U'];
    for (var i = 0; i < apellido.length; i++) {
        if (vocales.includes(apellido[i])) {
            for (var j = i + 1; j < apellido.length; j++) {
                if (vocales.includes(apellido[j])) {
                    return apellido[j];
                }
            }
        }
    }
    return ""; // Si no se encuentra una vocal siguiente, devuelve una cadena vacía
}
function generarClaveNumerica(fecha_nacimiento) {
    var clave = "";
    // Regla 2: Anotar la fecha de nacimiento en el formato especificado
    var fechaParts = fecha_nacimiento.split('-').map(function (part) { return parseInt(part); });
    var año = fechaParts[0].toString().slice(-2).padStart(2, '0'); // Dos últimas cifras del año
    var mes = fechaParts[1].toString().padStart(2, '0'); // Mes en número de orden
    var dia = fechaParts[2].toString().padStart(2, '0'); // Día en números arábigos
    clave = año + mes + dia;
    return clave;
}
