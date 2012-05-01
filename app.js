// This is a sample application which you can use as a starting point for your
// project. The only parts you should *need* to change are indicated with `TODO`
// below. However, you are welcome to change more if you wish.

////////////////////////////////////////////////////////////////////////////////

var USER_OR_GROUP_NAME = 'cortneycogar'; // TODO: Insert GitHub username or group name.

////////////////////////////////////////////////////////////////////////////////

if (! USER_OR_GROUP_NAME) { 
  throw new Error(
    'You must set your GitHub username or group name in the app.js file'); 
}

// Import some utility functions.
var utils = require('./utils');

// Create a new web application.
var app = utils.initializeWebApp();

// Connect to your database.
var db = utils.connectToDatabase(USER_OR_GROUP_NAME);

function sanitizeForUrl(str)
{return (str).toString().toLowerCase().replace(/[^a-z0-9]+/ig,'-');}

// TODO: Start defining your resource handlers. You may just need to modify the
// examples below, or you may need to add additional handlers by copying,
// pasting, and modifying these examples.

////////////////////////////////////////////////////////////////////////////////
// Example of handling PUT to create or update a resource. /////////////////////
// Here we create or update an item using the ID specified in the URI. /////////
////////////////////////////////////////////////////////////////////////////////
app.post('/add-film/',      // TODO: change to suit your URI design.
  function(req, res) {
      


    // Get the item info that was PUT from the input form.
    // See the form in `views/list-parties.ejs`.
    var item = req.body.film;
    
          
  
    // Generate the id
    var item_id = sanitizeForUrl(item.title);
    
    
    item.type = 'film'; // TODO: change to the type of item you want

    // Save the new item to the database, specifying the ID.
    db.save(item_id, item, function(err) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 
      
      // Otherwise, redirect back to the URI from which the form was submitted.
      else { res.redirect('back' ); }
    });
  }
);
// to add fims
app.get('/add-stuff/',      // TODO: change to suit your URI design.
  function(req, res) {
  
    // Get the item ID from the URI.
   // var item_id = req.query['id'];

    //var item = req.query['item'];
    
    var films = [
        ['panslabyrinth',"Pan's Labyrinth",'2008','director','M'],
        ['super-8',"Super 8",'2011','director2','PG-13'],
        ];
  // res.write(''+films.length);
    for(var i=0;i<films.length;i++)
    {
        var itm = films[i];
        var item_id = itm[0];
        var item = {
            
            "name":itm[1],
            "type":'film',
            "year":itm[2],
            "director":itm[3],
            "rating":itm[4]
        };
        res.write((item_id)+' '+itm[0]+' '+itm[1]);
        
        db.save(item_id, item, function(err) {

      // If there was a database error, return an error status.
      if (err) { res.write('failure\n'); } 
      
      // Otherwise, redirect back to the URI from which the form was submitted.
      else { res.write('success\n') }
    });
    
    }
    //res.end();
    
    return;
    
    item.type = 'film'; // TODO: change to the type of item you want

    // Save the new item to the database, specifying the ID.
    db.save(item_id, item, function(err) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 
      
      // Otherwise, redirect back to the URI from which the form was submitted.
      else { res.write() }
    });
  }
);


////////////////////////////////////////////////////////////////////////////////
// Example of handling GET of a "collection" resource. /////////////////////////
// Here we list all items of type `party`. /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/films/',         // TODO: change to suit your URI design. 
  function(req, res) {

    var item_type = 'film'; // TODO: change to the type of item you want.

    // Get all items of the specified type from the database.
    db.getAll(item_type, function(err, items) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
          db.getAll('directors',function(err2,directors){
              if(err2){ res.send(err, 500); } 
                else
                  {
               res.render(
                  'list-films',   // TODO: change to the name of your HTML template.
                  { "items": items,
                  "directors":directors}
                );
                }
              
              
              });
 
      }
    });
  }
);

app.get('/directors/',         // TODO: change to suit your URI design. 
  function(req, res) {

    var item_type = 'director'; // TODO: change to the type of item you want.

    // Get all items of the specified type from the database.
    db.getAll(item_type, function(err, items) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {

               res.render(
                  'list-directors',   // TODO: change to the name of your HTML template.
                  { "items": items}
                );

      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// Example of handling POST to create a resource. //////////////////////////////
// Here we create an item and allow the ID to be created automatically. ////////
////////////////////////////////////////////////////////////////////////////////
app.post('/directors/', // TODO: change to suit your URI design.
  function(req, res) {
  
    // Get the item info that was POSTed from the input form.
    // See the form in `views/one-party.ejs`.
    var item = req.body.item;
    var item_id= sanitizeForUrl(item.name);

    item.type = 'director'; // TODO: change to the type of item you want

    // Save the new item to the database. (No ID specified, it will be created.)
    db.save(item_id,item, function(err) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 
      
      // Otherwise, redirect back to the URI from which the form was submitted.
      else { res.redirect('back' ); }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// Another example of handling PUT to update a resource. ///////////////////////
// Here we update an item using the ID specified in the URI. ///////////////////
////////////////////////////////////////////////////////////////////////////////
app.put('/directors/{director-id}', // TODO: change to suit your URI design.
  function(req, res) {
  
    // Get the item ID from the URI.
    var item_id = req.params.id;

    // Get the item info that was PUT from the input form.
    // See the form in `views/one-candidate.ejs`.
    var item = req.body.item;

    item.type = 'director'; // TODO: change to the type of item you want

    // Save the new item to the database, specifying the ID.
    db.save(item_id, item, function(err) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 
      
      // Otherwise, redirect back to the URI from which the form was submitted.
      else { res.redirect('back' ); }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// Another example of handling GET of a "collection" resource. /////////////////
// This time we support filtering the list by some criteria (i.e. searching). //
////////////////////////////////////////////////////////////////////////////////
app.get('/films/?rating={R}/',          // TODO: change to suit your URI design. 
  function(req, res) {

    var item_type = 'rating'; // TODO: change to the type of item you want.

    // Get items of the specified type that match the query.
    db.getSome(item_type, req.query, function(err, items) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
        res.render(
          'list-films-by-rating', // TODO: change to the name of your HTML template.
          { items: items }
        );
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// An example of handling GET of a "single" resource. //////////////////////////
// This handler is more complicated, because we want to show not only the //////
// item requested, but also links to a set of related items. ///////////////////
////////////////////////////////////////////////////////////////////////////////
app.get(/^\/films\/([a-z\-]+)_(\d+)\/?$/,      // TODO: change to suit your URI design.
  function(req, res) {
     return res.send(req.params);
      

    var item_type = 'film'; // TODO: change to the type of item you want.

    // Get the item ID from the URI.
    var item_id = req.params.id;
  
    // Get one item of the specified type, identified by the item ID.
    db.getOne(item_type, item_id, function(err, item) {
        
      // If there was a database error, return an error status.
      if (err) {
        if (err.error == 'not_found') { res.send(404); }
        else { res.send(err, 500); }
      } 

      // Otherwise, get the related items associated with this item.
      else {
        
        var related_type = 'director'; // TODO: change to type of related item.

        // Set our query to find the items related to the requested item.
        req.query.party = item_id; // TODO: change `party` to reflect the
                                   // relation between the item fetched above
                                   // and the related items to be fetched below.

        // Get items of the specified type that match the query.
        db.getSome(related_type, req.query, function(err, items) {

          // If there was a database error, return an error status.
          if (err) { res.send(err, 500); } 

          // Otherwise, use the returned data to render an HTML page.
          else {
            res.render(
            'one-film', // TODO: change to the name of your HTML template.
              { item: item, related_items: items }
            );
          }
        });
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// An example of handling GET of a "single" resource. //////////////////////////
// This handler is also complicated, because we want to show not only the //////
// item requested, but also a list of potential related items, so that users ///
// can select from a list when updating the item. //////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/directors/{director-id}/',       // TODO: change to suit your URI design.
  function(req, res) {

    var item_type = 'director'; // TODO: change to the type of item you want.

    // Get the item ID from the URI.
    var item_id = req.params.id;
  
    // Get one item of the specified type, identified by the item ID.
    db.getOne(item_type, item_id, function(err, item) {
        
      // If there was a database error, return an error status.
      if (err) {
        if (err.error == 'not_found') { res.send(404); }
        else { res.send(err, 500); }
      } 

      // Otherwise, get the items potentially related to this item.
      else {
        
        var related_type = 'film'; // TODO: change to type of related item.

        // Get all items of the specified related type.
        db.getAll(related_type, function(err, items) {

          // If there was a database error, return an error status.
          if (err) { res.send(err, 500); } 

          // Otherwise, use the returned data to render an HTML page.
          else {
            res.render(
              'one-director', // TODO: change to name of your HTML template.
              { item: item, related_items: items }
            );
          }
        });
      }
    });
  }
);


// Handle GET of the "index" resource.
app.get('/', function(req, res) { res.render('index'); });

// Start listening for incoming HTTP connections.
app.listen(process.env.PORT);
