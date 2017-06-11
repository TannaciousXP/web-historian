var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // console.log(req.method)
  if (req.method === 'GET') {
    fs.readFile(archive.paths.siteAssets + 'index.html', 'utf8', function(err, data) {
      if (err) {
        throw err;
      } else {
        res.end(data);
      }
    });
    
  } else if (req.method === 'POST') {
    req.on('data', function(data) {
      var url = data.toString().slice(4) + '\n';
      
      archive.isUrlInList(url, function(isInList) {
        if (!isInList) {
          archive.addUrlToList(url, function() {
            console.log('Added to list');
          });
          fs.readFile(archive.paths.siteAssets + 'loading.html', 'utf8', function(err, data) {
            if (err) {
              throw err;
            } else {
              res.writeHeader(302, {'Content-Type': 'text/html'});
              res.end(data);
            }
          });
        }

        archive.isUrlArchived(url, function(isInArchive) {
          if (!isInArchive) {
            fs.readFile(archive.paths.siteAssets + 'loading.html', 'utf8', function(err, data) {
              if (err) {
                throw err;
              } else {
                res.writeHeader(302, {'Content-Type': 'text/html'});
                // res.send(data);
              }
            });
          }
          console.log(url);
          console.log(isInList, isInArchive);
        });
      });
    });

      // if URL is in list
        // check if URL is in archive
          // if URL is in archive
            // send page
          // if URL is NOT in archive
            // send loading page
            // download URL page onto archive
      // if URL is NOT in list
        // send back loading page
        // add URL to list
        // download URL page into archive 
        
    // });
    
  }
  
  // res.end(archive.paths.siteAssets);
};
