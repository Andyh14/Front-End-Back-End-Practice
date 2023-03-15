const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('sqlite3_server.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the users database.');
    
  });



app.post('/create', (req, res) => {
        const name = req.body.name;
        const id = req.body.id;
        const points = req.body.points;

        db.run('INSERT INTO users (names, id, points) VALUES (?,?,?)', [name, id, points], (err, result) => {
            if (err){
                console.log(err)
            } else{
                res.send("Values Inserted")
            }
        });
});


app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", (err, result) => {
        if(err) {
            console.log(err)
        }else{
            res.send(result)
        }
    });
});


app.put('/update', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const sql = `UPDATE users SET names = ? WHERE id = ?`;

  db.run(sql, [name, id], function(err) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(`Row(s) updated: ${this.changes}`);
      res.status(200).send(`Row(s) updated: ${this.changes}`);
    }
  });
});

app.put('/updatepoints', (req, res) => {
    const id = req.body.id;
    const points = req.body.points;
    const sql = `UPDATE users SET points = ? WHERE id = ?`;

  db.run(sql, [points, id], function(err) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(`Row(s) updated: ${this.changes}`);
      res.status(200).send(`Row(s) updated: ${this.changes}`);
    }
  });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.run("DELETE FROM users WHERE id = ?", id, (err) => {
        if (err) {
            console.log(err);
        } else{
            res.send('User deleted successfully');
        }
    });
});

app.get('/search/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
      if (err) {
        console.log(err);
        res.send('Error occurred');
      } else {
        if (row) {
          res.send(row);
        } else {
          res.send('User not found');
        }
      }
    });
});

app.listen(3001, () => {
    console.log("Yay, The srever is running on port 3001")
});

