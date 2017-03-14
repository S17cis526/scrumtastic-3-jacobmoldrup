"use strict";


/** @module project 
 * A RESTful resource representing a software project 
 * implemented the L-CRUD methods
*/

module.exports = {
    list: list,
    create: create,
    read: read,
    update: update,
    destroy: destroy
}

/** @function list
 * sends a list of all projects as a json array.
 */
function list(req, res, db){
    db.all("SELECT * FROM projects", [], function(err, projects){
        // if err, some error happened in the database. maybe projects folder doesnt exist
        if(err)
        {
            console.error(err);
            res.statusCode = 500;
            res.end("Server Error");
        }
        res.setHeader("Content-Type", "text/json");
        res.end(JSON.stringify(projects));
    });
}

/** @function create
 * Creates a new project and adds it to the database
 */
function create(req, res, db){
    var body = "";
    req.on("err", function(err){
        console.error(err);
        res.statusCode = 500;
        res.end("Server Error");
    });
    req.on("data", function(data){
        body += data;
    });
    req.on("end", function(){
        var project = JSON.parse(body);
        db.run("INSERT INTO projects (name, description, version, repository, license) VALUES (?,?,?,?,?)",
                [project.name, project.description, project.version, project.repository, project.license],
                function(err){
                    if(err){
                        console.error(err);
                        res.statusCode = 500;
                        res.end("Could not insert project into database");
                        return;
                    }
                        res.statusCode = 200;
                        res.end();
                        return;

                });
    });
}


/** @function read
 * Reads a specific project as JSON stringify
 */
function read(req, res, db){
    var id  = req.params.id;
    db.get("SELECT * FROM projects WHERE id=?",[id], function(err, project){
        if(err){
            console.error(err);
            res.statusCode = 500;
            res.end("Server Error");
            return;
        }
        if(!project){
            res.statusCode = 404;
            res.end("Project not found");
            return;
        }
        res.setHeader("Content-Type", "text/json");
        res.end(JSON.stringify(project));
    });
}

/** @function update
 * Updates a specific project with the supplied values.
 */
function update(req, res, db){
    var id  = req.params.id;
    var project = JSON.parse(body);
    req.on("end", function(){
        var project = JSON.parse(body);
        db.run("INSERT INTO projects (name, description, version, repository, license) VALUES (?,?,?,?,?)",
                [project.name, project.description, project.version, project.repository, project.license],
                function(err){
                    if(err){
                        console.error(err);
                        res.statusCode = 500;
                        res.end("Could not insert project into database");
                        return;
                    }
                        res.statusCode = 200;
                        res.end();
                        return;

                });
    });}


/** @function destroy
 * destroys a specific project with the supplied values.
 */
function destroy(req, res, db){
    var id = req.params.id;
    db.run("DELETE FROM projects WHERE id=?", [id], function(err){
        if(err){
            console.error(err);
            res.statusCode = 500;
            res.end("Server error");
            return;
        }
        res.statusCode = 200;
        res.end();
    });
}
