/* Sort some photos using the exif module */
var img = require('exif').ExifImage;
var fs = require('fs');

function checkFileInfo(filename) {
  
  fs.stat(filename, function(err, stats) {
    if(!stats.isDirectory()) {
      new img({ image : filename }, function(err, exif) {
        if(!err) {
          
          console.log(filename + 
            ' was created on ' + 
            exif.exif.CreateDate.toString());
          
          fs.mkdir(exif.exif.CreateDate.toString(),
                  null,
                  function(err) {
                    
                    if(err)
                      console.log(err);
                    else {
                      // Move the file to a directory
                      fs.rename(filename,
                        exif.exif.CreateDate.toString() + '//' +
                        filename,
                        function(err) {
                          if(err)
                            console.log(err);
                        }); // End rename  
                    } // End else (no error)
                  }); // End mkdir
            
        } // End if not an error
      }); // End image creation
    } // End if it's not a directory
  }); // End stat on the filename
} // End checkFileInfo

fs.readdir('./', function(err, dirlisting) {

  for(var f in dirlisting) {
  
    //console.log('In the for loop I see '+ dirlisting[f]);
    checkFileInfo(dirlisting[f]);
  } // end for each file name

});
