var file_system = require('fs');
var sharp = require('sharp');
var exifReader = require('exif-reader');
var mongoose = require('mongoose');
var assets = './images';
// AUX 2
var Metadata = /** @class */ (function () {
    function Metadata() {
    }
    Metadata.extract_from = function (file) {
        return sharp(assets + "/" + file)
            .metadata()
            .then(function (info) { return info.exif ? exifReader(info.exif) : null; });
    };
    return Metadata;
}());
var metadata;
// MAIN
file_system.readdirSync(assets)
    .filter(function (file) { return by_format(file, '.jpg'); })
    .forEach(function (file) { return Metadata.extract_from(file).then(function (info) { return console.log(info); }); });
// AUX 1
function by_format(file, format) {
    return file.endsWith(format);
}
// mongoose.connect('mongodb://localhost/my_database');
