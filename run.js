var file_system = require('fs');
var sharp = require('sharp');
var exifReader = require('exif-reader');
var mongoose = require('mongoose');
var assets = './images';
/*
 * Clase que se encarga de la persistencia de datos
 */
var Storer = /** @class */ (function () {
    function Storer(data) {
        this.data = data;
    }
    Storer.prototype.store_on = function () {
        this.data.then(function (info) { return console.log(info); });
    };
    return Storer;
}());
/*
 * Clase que se encarga extraer los metadatos de un archivo
 */
var Extract = /** @class */ (function () {
    function Extract() {
    }
    Extract.metadata_from = function (file) {
        var storer = new Storer(sharp(assets + "/" + file)
            .metadata()
            .then(function (info) { return info.exif ? exifReader(info.exif) : null; }));
        return storer;
    };
    return Extract;
}());
/*
 * MAIN
 */
file_system.readdirSync(assets)
    .filter(function (file) { return by_format(file, '.jpg'); })
    .forEach(function (file) { return Extract.metadata_from(file).store_on(); });
/*
 * Función auxiliar para el filtrado
 */
function by_format(file, format) {
    return file.endsWith(format);
}
