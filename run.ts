const file_system = require('fs');
const sharp = require('sharp');
const exifReader = require('exif-reader');
const mongoose = require('mongoose');


const assets = './images';


// AUX 2
class Metadata {
    public static extract_from(file) {        
        return sharp(`${assets}/${file}`)
            .metadata()
            .then((info) => { return info.exif ? exifReader(info.exif) : null }
        );        
    }
}


let metadata: any[];

// MAIN
file_system.readdirSync( assets )
.filter( (file) => by_format(file,'.jpg') )
.forEach( (file) => Metadata.extract_from(file).then((info) => console.log(info) ));


// AUX 1
function by_format(file, format) {
    return file.endsWith(format);
}


// mongoose.connect('mongodb://localhost/my_database');
