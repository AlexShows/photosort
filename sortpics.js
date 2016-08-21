/* Sort some photos using the exif module */
var img = require('exif').ExifImage;
var fs = require('fs');

function checkFileInfo(filename) {
  
  fs.stat(filename, function(err, stats) {
    if(!stats.isDirectory()) {
      new img({ image : filename }, function(err, exif) {
        if(!err)
          console.log(filename + 
            ' was created on ' + 
            exif.exif.CreateDate.toString());
      });
    }
  });
}

fs.readdir('./', function(err, dirlisting) {

  for(var f in dirlisting) {
  
    //console.log('In the for loop I see '+ dirlisting[f]);
    checkFileInfo(dirlisting[f]);
  } // end for each file name

});
