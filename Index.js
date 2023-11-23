const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const { Pool } = require('pg');

const pool = new Pool({
    user: 'default',
    host: 'ep-orange-smoke-08960365.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'bf3BTmnKYd4P',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});


app.get("/students", (req, res) => {
    
    const listUsersQuery = `SELECT * FROM students;`;

    pool.query(listUsersQuery)
        .then(data => {

            console.log("List students: ", data.rows);
            res.send(data.rows)
            // pool.end();
        })
        .catch(err => {
            console.error(err);
            // pool.end();
        });




})
app.get("/students/:id", (req, res) => {

    
    const listUsersQuery = "SELECT * FROM students WHERE id = "+ req.params.id

    

    pool.query(listUsersQuery)
        .then(data => {

            console.log("List students: ", data.rows);
            res.send(data.rows)
            // pool.end();
        })
        .catch(err => {
            console.error(err);
            // pool.end();
        });




})

app.post('/students', function(req,res){
    const insertUsersQuery = `
    INSERT INTO students (id,name,lastname, notes) VALUES
    ('${req.body.id}','${req.body.name}','${req.body.lastname}','${req.body.notes}');
    `;
   

    pool.query(insertUsersQuery)
    .then(() => {
        res.send("ADD");
    })
    .catch(err => {
        console.error(err);
    
    });
}
)

app.put("/students/put/:id", (req, res) => {


    const updateData = `UPDATE students SET id = ${req.body.id}, name ='${req.body.name}', lastname = '${req.body.lastname}', notes = '${req.body.notes}' WHERE id IN (${req.params.id})`;

    pool.query(updateData)
        .then(respond => {
            console.log(respond.rows);
            res.send("SE HAN ACTUALIZADO LOS DATOS")

        })
        .catch(err => {

            res.send("page not found")

            console.error(err);
            //pool.end();
        });
})

app.delete("/students/delete/:id",(req,res)=>{

const borrarUsuario = `DELETE FROM students WHERE id = ${req.params.id}`
;
 pool.query(borrarUsuario)
 .then(respond=>{
    console.log(respond.rows);

 res.send("se ha borrado el usuario")

})
.catch(err => {
       
    res.send("page not found")
    console.error(err);
})
})

app.listen(port, ()=>{
    console.log("the app is running");
})