/*
Ver archivo database.sql para crear la base de datos y la tabla si es necesario
Cambiar en constante config el usuario y password de conexión, y de ser necesario la database
*/

const { Pool } = require('pg');

const config = {
  user: 'emily',
  password: '12345678',
  host: 'localhost',
  database: 'emily_herrera_always_music_826',
  port: 5432,
}

const pool = new Pool(config);

const consulta_datos = async () => {
  const result = await pool.query('SELECT * FROM usuarios');
  console.log(result.rows);
}

const insertar_usuario = async (datos) => {
  if (datos.length != 4) {
    console.log('Lo siento, parametros incorrectos, para insertar debes utilizar: node index.js nuevo "Nombre" "Rut" "Curso" "Nivel"');
    console.log('Datos recibidos: ', datos);
  } else {
    const [nombre, rut, curso, nivel] = datos;
    try {
      const queryText = 'INSERT INTO usuarios (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4);';
      await pool.query(queryText, [nombre, rut, curso, nivel]);
      console.log(`Estudiante ${nombre} agregado con éxito`);
    } catch(e) {
      console.log(`Ocurrio un error al intentar agregar al estudiante ${nombre}: `, e);
    }
  }
}

const editar_usuario = async (datos) => {
  if (datos.length != 4) {
    console.log('Lo siento, parametros incorrectos, para editar debes utilizar: node index.js editar "Nombre" "Rut" "Curso" "Nivel"');
    console.log('Datos recibidos: ', datos);
  } else {
    const [nombre, rut, curso, nivel] = datos;
    try {
      const queryText = 'UPDATE usuarios SET rut = $1, curso = $2, nivel = $3 WHERE nombre = $4;';
      const res = await pool.query(queryText, [rut, curso, nivel, nombre]);
      if (res.rowCount > 0) {
        console.log(`Estudiante ${nombre} actualizado con éxito`);
      } else {
        console.log(`No se encontró un estudiante con el nombre ${nombre} para actualizar`);
      }
    } catch(e) {
      console.log(`Ocurrio un error al intentar editar al estudiante ${nombre}: `, e);
    }
  }
}

const buscar_rut = async (datos) => {
  if (datos.length != 2) {
    console.log('Lo siento, parametros incorrectos, para buscar por rut debes utilizar: node index.js rut - "Rut"');
    console.log('Datos recibidos: ', datos);
  } else {
    const [_, rut] = datos;
    try {
      const queryText = 'SELECT * FROM usuarios WHERE rut = $1';
      const res = await pool.query(queryText, [rut]);
      if (res.rowCount > 0) {
        console.log(res.rows);
      } else {
        console.log(`No se encontró un estudiante con el rut ${rut}`);
      }
    } catch(e) {
      console.log(`Ocurrio un error al intentar buscar el rut ${rut}: `, e);
    }
  }
}

const eliminar_rut = async (datos) => {
  if (datos.length != 2) {
    console.log('Lo siento, parametros incorrectos, para buscar por rut debes utilizar: node index.js rut - "Rut"');
    console.log('Datos recibidos: ', datos);
  } else {
    const [_, rut] = datos;
    try {
      const queryText = 'DELETE FROM usuarios WHERE rut = $1;';
      const res = await pool.query(queryText, [rut]);
      if (res.rowCount > 0) {
        console.log(`Usuario con RUT ${rut} eliminado con éxito`);
      } else {
        console.log(`No se encontró un usuario con RUT ${rut} para eliminar`);
      }
    } catch(e) {
      console.log(`Ocurrio un error al intentar eliminar al rut ${rut}: `, e);
    }
  }
}

async function app() {
  const argumentos = process.argv.slice(2)
  const comando = argumentos.shift();
  switch (comando) {
    case 'nuevo':
      insertar_usuario(argumentos);
      break;
    case 'consulta':
      consulta_datos();
      break;
    case 'editar':
      editar_usuario(argumentos);
      break;
    case 'rut':
      buscar_rut(argumentos);
      break;
    case 'eliminar':
      eliminar_rut(argumentos);
      break;
    default:
      console.log('Lo siento, comando no reconocido: ', comando);
  }
  pool.end()
}

app();