const mongoose = require('mongoose');
const randomstring = require('randomstring');

let applicationSchema = new mongoose.Schema({
    applicationId: { //El ID que se va a generar aleatoriamene para cada app 
        type: String,
        required: true,
        unique: true
    },
    secret: { //La contrasena para que esta la pueda utilizar
        type: String,
        required: true,
        unique: true
    },
    origins: String, //Desde que dominios que va a poder ejecutar ajax
    name: String //Para poder identificar la app
});

//Functions
function assignRandomAndUniqueValueToField(app, field, next) {
    //Generamos y almacenamos la cadena aleatoria
    const randomString = randomstring.generate(20);

    //Se asigna al valor generado a un objeto 
    let searchValue = {};
    searchValue[field] = randomString;

    //Se busca los valores que coincidan con el String generado
    Application.count(searchValue).then(count => {
        //Si la cuenta es mayor que 0(si hay repetidos), se hace revursividad
        if (count > 0) return assignRandomAndUniqueValueToField(app, field, next);
        //Si no, se asigna el valor y continua el middleware
        app[field] = randomString;
        next();
    })
}

//HOOK
applicationSchema.pre('validate', function (next) {
    assignRandomAndUniqueValueToField(this, 'applicationId', () => {
        assignRandomAndUniqueValueToField(this, 'secret', next);
    });
});


const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;