/* Sort some photos using the exif module */
var img = require('exif').ExifImage;
var fs = require('fs');

function checkFileInfo(filename) {
  
  fs.stat(filename, function(err, stats) {
    if(!stats.isDirectory()) {
      new img({ image : filename }, function(err, exif) {
        if(!err) {
          
          var fileCreatedDate = exif.exif.CreateDate.toString();
          
          console.log(filename + 
            ' was created on ' + 
            fileCreatedDate);
          
          // Extract year, month, day from CreateDate
          var year = fileCreatedDate.substring(0,4);
          var month = fileCreatedDate.substring(5,7);
          var day = fileCreatedDate.substring(8,10);
          
          console.log('This directory ' + 
                      year + '/' + 
                      month + '/' + 
                      day);
          
          fs.mkdir(year,
                  null,
                  function(err) {
                    
                    if(err)
                      console.log(err);
                    
                    // Create the next directory down
                    fs.mkdir(year + '/' + month,
                            null,
                            function(err) {
                      
                      if(err)
                        console.log(err);
                        
                      // Create the next directory down
                      fs.mkdir(year + '/' + month + '/' + day,
                              null,
                              function(err) {
                        if(err)
                          console.log(err);
                        
                        // Move the file to a directory
                        fs.rename(filename,
                          year + '/' + month + '/' + day + '/' +
                          filename,
                          function(err) {
                            if(err)
                              console.log(err);
                        }); // End rename  
                        
                      }); // End mkdir (day)
                    }); // End mkdir (month)
                  }); // End mkdir (year)
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
