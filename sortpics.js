/* Sort some photos using the exif module */
var img = require('exif').ExifImage;
var fs = require('fs');
var mkdirp = require('mkdirp');
const path = require('path');

function checkFileInfo(pathname, filename) {

  fs.stat(pathname + path.sep + filename, function(err, stats) {
    if(err){
        console.log(err);
        return;
    }
    if(!stats.isDirectory()) {
      new img({ image : pathname + path.sep + filename }, function(err, exif) {
        if(!err) {
          
			if(exif.exif.CreateDate == undefined)
				return;			

          var fileCreatedDate = exif.exif.CreateDate.toString();
          
          // Extract year, month, day from CreateDate
          var year = fileCreatedDate.substring(0,4);
          var month = fileCreatedDate.substring(5,7);
          var day = fileCreatedDate.substring(8,10);
          
          mkdirp(pathname + path.sep + year + path.sep + month + path.sep + day, 0777,
                  function(err) {
                    
                    if(err)
                      console.log(err);
                    
					// Move the file to a directory
                    fs.rename(pathname + path.sep + filename,
                      pathname + path.sep + 
                              year + path.sep + 
                              month + path.sep + 
                              day + path.sep +
                      filename,
                      function(err) {
                        if(err)
                          console.log(err);
                    }); // End rename  
          }); // End mkdirp
        } // End if no error in exif img creation
      }); // End if img creation
    } // End if it's not a directory
  }); // End stat on the filename
} // End checkFileInfo

// If the user passed a directory on the command line, use it
// Otherwise, use the current working directory
var targetDirectory = '';
if(process.argv[2] != undefined)
	targetDirectory = process.argv[2];
else
	targetDirectory = './';

fs.readdir(targetDirectory, function(err, dirlisting) {
	
	for(var f in dirlisting) {
		checkFileInfo(targetDirectory, dirlisting[f]);
	} // end for each file name
});

