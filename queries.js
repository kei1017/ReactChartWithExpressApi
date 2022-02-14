const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ExpRestData',
  password: 'abc123',
  port: 5432,
})

const getUsers = (req, res) => {
  pool.query('SELECT * FROM accounts ORDER BY id ASC', (error, results) => {
    if (error) {
      res.status(200).json(results.rows)
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM accounts WHERE id = $1', [id], (error, results) => {
    if (error) {
      res.status(400).send({message: error.toString()});
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const createUser = (req, res) => {
  const { username, email, password } = req.body

  pool.query(
    'INSERT INTO accounts (username, email, password) VALUES ($1, $2, $3)',
    [username, email, password],
    (error, results) => {
      if (error) {
        res.status(400).send({message: error.toString()});
      } else {
        console.log(results)
        res.status(201).send(`User added`)
      }
    }
  )
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { username, email, password } = req.body

  pool.query(
    'UPDATE accounts SET username = $1, email = $2, password = $3 WHERE id = $4',
    [username, email, password, id],
    (error, results) => {
      if (error) {
        res.status(400).send({message: error.toString()});
      } else {
        res.status(200).send(`User modified with ID: ${id}`)
      }
    }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM accounts WHERE id = $1', [id], (error, results) => {
    if (error) {
      res.status(400).send({message: error.toString()});
    } else {
      res.status(200).send(`User deleted with ID: ${id}`)
    }
  })
}

const authUser = (req, res) => {
  const { email, password } = req.body

  pool.query(
    'SELECT * FROM accounts WHERE email = $1 AND password = $2',
    [email, password],
    (error, results) => {
      if (error) {
        res.status(400).send({message: error.toString()});
      } else {
        res.status(200).send(results.rows.length > 0)
      }
    }
  )
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authUser,
}
