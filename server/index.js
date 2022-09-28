const express = require("express")
const PORT = process.env.PORT || 3001
const app = express()
/* Middleware */
const cors = require("cors")
/* convierte los valores recibidos y enviados a un formato que ambos node y react entienden y pueden manejar */
const bodyParser = require("body-parser")
const mysql = require("mysql")

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "proyectotesting",
})
/* Recordar llamar esta funcion con los parentesis */
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
	res.send("Working with Express!!")
})

app.get("/api", (req, res) => {
	res.send({message: "Hello from the server!"})
})

app.get("/api/getAlumnos", (req, res) => {
	const sqlSelect = "Select * from alumno"
	db.query(sqlSelect, (err, result) => {
		if (err) throw err
		res.send(result)
		/* envia el resultado a la consola de nodejs */
	})
})

app.get("/api/traerEstudiantes", (req, res) => {
	res.send(datosDeEstudiantes)
})

app.get("/api/getCursos", (req, res) => {
	const sqlSelect = "Select * from curso"
	db.query(sqlSelect, (err, result) => {
		if (err) throw err
		res.send(result)
		/* envia el resultado a la consola de nodejs */
	})
})

app.get("/api/getProfesor", (req, res) => {
	const sqlSelect = "Select * from profesor"
	db.query(sqlSelect, (err, result) => {
		if (err) throw err
		res.send(result)
		/* envia el resultado a la consola de nodejs */
	})
})

app.get("/api/getCursosCreados", (req, res) => {
	const sqlSelect =
		/* Ojo, si el nombre que se le esta pasando al select como acortador esta repetido, este valor se va a sobreescribir, ejemplo ID del Curso con Id del nombre del curso */
		"Select cc.cursosCreados_id as 'ID_del_Curso',pf.profesor_nombre as 'Nombre_Del_Profesor', cr.curso_nombre as 'Nombre_del_Curso', cr.curso_id as 'ID_del_nombre_del_Curso' from cursos_creados as cc inner join alumno as al1 on cc.alumno1_id = al1.alumno_id inner join alumno as al2 on cc.alumno2_id = al2.alumno_id inner join alumno as al3 on cc.alumno3_id = al3.alumno_id inner join alumno as al4 on cc.alumno4_id = al4.alumno_id inner join alumno as al5 on cc.alumno5_id = al5.alumno_id INNER JOIN curso as cr on cc.curso_id = cr.curso_id INNER JOIN profesor as pf on cc.profesor_id = pf.profesor_id;"
	db.query(sqlSelect, (err, result) => {
		if (err) throw err
		res.send(result)
	})
})

app.get("/api/getCursosCreadosAlumnos", (req, res) => {
	const sqlSelect =
		"Select al1.alumno_nombre as 'Estudiante_1', al1.alumno_id as 'Id_del_Estudiante_1', al2.alumno_nombre as 'Estudiante_2',al2.alumno_id as 'Id_del_Estudiante 2',  al3.alumno_nombre as 'Estudiante_3', al3.alumno_id as 'Id_del_Estudiante_3', al4.alumno_nombre as 'Estudiante_4', al4.alumno_id as 'Id_del_Estudiante_4', al5.alumno_nombre as 'Estudiante_5', al5.alumno_id as 'Id_del_Estudiante_5' from cursos_creados as cc inner join alumno as al1 on cc.alumno1_id = al1.alumno_id inner join alumno as al2 on cc.alumno2_id = al2.alumno_id inner join alumno as al3 on cc.alumno3_id = al3.alumno_id inner join alumno as al4 on cc.alumno4_id = al4.alumno_id inner join alumno as al5 on cc.alumno5_id = al5.alumno_id INNER JOIN curso as cr on cc.curso_id = cr.curso_id INNER JOIN profesor as pf on cc.profesor_id = pf.profesor_id;"
	db.query(sqlSelect, (err, result) => {
		if (err) throw err
		res.send(result)
	})
})

app.get("/api/getCursosCompletos", (req, res) => {
	const sqlSelect =
		"Select cr.curso_nombre as 'Curso', pf.profesor_nombre as 'Profeso', al1.alumno_nombre as 'Estudiante_1', al2.alumno_nombre as 'Estudiante_2', al3.alumno_nombre as 'Estudiante_3', al4.alumno_nombre as 'Estudiante_4', al5.alumno_nombre as 'Estudiante_5'from cursos_creados as cc inner join alumno as al1 on cc.alumno1_id = al1.alumno_id inner join alumno as al2 on cc.alumno2_id = al2.alumno_id  inner join alumno as al3 on cc.alumno3_id = al3.alumno_id inner join alumno as al4 on cc.alumno4_id = al4.alumno_id inner join alumno as al5 on cc.alumno5_id = al5.alumno_id INNER JOIN curso as cr on cc.curso_id = cr.curso_id  INNER JOIN profesor as pf on cc.profesor_id = pf.profesor_id;"
	db.query(sqlSelect, (err, result) => {
		if (err) throw err
		res.send(result)
	})
})

app.get("/api/getTraerAlumnos", (req, res) => {
	console.log(datosDeEstudiantes)
	res.send(datosDeEstudiantes)
})

let datosDeEstudiantes = []
app.get(`/api/getCursoCreadoElegido`, (req, res) => {
	const claseSeleccionadaId = req.query.claseSeleccionadaId
	const claseSeleccionadaNombre = req.query.claseSeleccionadaNombre
	const sqlSelect = `Select cr.curso_nombre, cc.cursosCreados_id, pf.profesor_nombre, pf.profesor_id, al1.alumno_nombre as 'Alumno1', al1.alumno_id as 'AlumnoId1', al2.alumno_nombre 'Alumno2', al2.alumno_id as 'AlumnoId2', al3.alumno_nombre as 'Alumno3', al3.alumno_id as 'AlumnoId3', al4.alumno_nombre as 'Alumno4', al4.alumno_id as 'AlumnoId4', al5.alumno_nombre as 'Alumno5', al5.alumno_id as 'AlumnoId5' from cursos_creados as cc  inner join alumno as al1 on cc.alumno1_id = al1.alumno_id inner join alumno as al2 on cc.alumno2_id = al2.alumno_id inner join alumno as al3 on cc.alumno3_id = al3.alumno_id inner join alumno as al4 on cc.alumno4_id = al4.alumno_id inner join alumno as al5 on cc.alumno5_id = al5.alumno_id INNER JOIN curso as cr on cc.curso_id = cr.curso_id INNER JOIN profesor as pf on cc.profesor_id = pf.profesor_id Where cc.cursosCreados_id = ${
		claseSeleccionadaId || "cursosCreados_id = 2"
	} and pf.profesor_nombre = "${
		claseSeleccionadaNombre || "Carlos Alejandro"
	}";`
	db.query(sqlSelect, (err, resultado) => {
		if (err) throw err
		datosDeEstudiantes = resultado
		console.log(resultado)
		res.send(resultado)
	})
})

/* ENVIA los datos a esta direccion, la que se encuentra en ComponenteSeleccionado con Axios */
app.post("/api/insert/alumno", (req, res) => {
	/* el nombre de la variable de req.body es el que se esta pasando desde el frontend de la peticion de axios */
	const alumnoNombre = req.body.alumnoNombre
	const alumnoEdad = req.body.alumnoEdad
	const alumnoRut = req.body.alumnoRut
	const alumnoCorreo = req.body.alumnoCorreo
	const alumnoTelefono = req.body.alumnoTelefono
	/* Consulta SQL almacenada en una variable, los valores en los parentesis se pasan durante el db.query */
	const sqlInsert =
		"INSERT INTO alumno(alumno_nombre, alumno_edad, alumno_rut, alumno_correo, alumno_telefono) VALUES (?,?,?,?,?)"
	db.query(
		sqlInsert,
		[alumnoNombre, alumnoEdad, alumnoRut, alumnoCorreo, alumnoTelefono],
		(err, result) => {
			if (err) throw err
			/* envia el resultado a la consola de nodejs */
			console.log(result)
		}
	)
})

app.post("/api/insert/profesor", (req, res) => {
	/* el nombre de la variable de req.body es el que se esta pasando desde el frontend de la peticion de axios */
	const profesorNombre = req.body.profesorNombre
	const profesorEdad = req.body.profesorEdad
	const profesorRut = req.body.profesorRut
	const profesorCorreo = req.body.profesorCorreo
	const profesorTelefono = req.body.profesorTelefono
	/* Consulta SQL almacenada en una variable, los valores en los parentesis se pasan durante el db.query */
	const sqlInsert =
		"INSERT INTO profesor(profesor_nombre, profesor_edad, profesor_rut, profesor_correo, profesor_telefono) VALUES (?,?,?,?,?)"
	db.query(
		sqlInsert,
		[
			profesorNombre,
			profesorEdad,
			profesorRut,
			profesorCorreo,
			profesorTelefono,
		],
		(err, result) => {
			if (err) throw err
			/* envia el resultado a la consola de nodejs */
			console.log(result)
		}
	)
})

app.post("/api/insert/curso", (req, res) => {
	/* el nombre de la variable de req.body es el que se esta pasando desde el frontend de la peticion de axios */
	const cursoNombre = req.body.cursoNombre
	/* Consulta SQL almacenada en una variable, los valores en los parentesis se pasan durante el db.query */
	const sqlInsert = "INSERT INTO curso(curso_nombre) VALUES (?)"
	db.query(sqlInsert, cursoNombre, (err, result) => {
		if (err) throw err
		/* envia el resultado a la consola de nodejs */
		console.log(result)
	})
})

app.post("/api/insert/cursoCreado", (req, res) => {
	const cursoNombre = req.body.cursoNombre
	const cursoProfesor = req.body.cursoProfesor
	const cursoAlumno1 = req.body.cursoAlumno1
	const cursoAlumno2 = req.body.cursoAlumno2
	const cursoAlumno3 = req.body.cursoAlumno3
	const cursoAlumno4 = req.body.cursoAlumno4
	const cursoAlumno5 = req.body.cursoAlumno5
	const sqlInsert =
		"INSERT INTO cursos_creados(curso_id, profesor_id, alumno1_id, alumno2_id, alumno3_id, alumno4_id, alumno5_id) VALUES (?,?,?,?,?,?,?)"
	db.query(
		sqlInsert,
		[
			cursoNombre,
			cursoProfesor,
			cursoAlumno1,
			cursoAlumno2,
			cursoAlumno3,
			cursoAlumno4,
			cursoAlumno5,
		],
		(err, result) => {
			if (err) throw err
			console.log(result)
		}
	)
})

app.post("/api/insert/cursoNotas", (req, res) => {
	const alumnoId = req.body.alumnoId
	const cursoId = req.body.cursoId
	const nota1 = req.body.nota1
	const nota2 = req.body.nota2
	const nota3 = req.body.nota3
	const nota4 = req.body.nota4
	const notaExamenFinal = req.body.notaExamenFinal
	const promedio = req.body.promedio
	let estado = ""
	if (promedio >= 4) {
		estado = "Aprobado"
	} else {
		estado = "Reprobado"
	}

	const sqlInsert =
		"INSERT INTO `curso_notas`(`alumno_id`, `cursosCreados_id`, `curso_notas_1`, `curso_notas_2`, `curso_notas_3`, `curso_notas_4`, `curso_notas_Final`, `curso_notas_promedio`, `curso_notas_estado`) VALUES (?,?,?,?,?,?,?,?,?)"
	db.query(
		sqlInsert,
		[
			alumnoId,
			cursoId,
			nota1,
			nota2,
			nota3,
			nota4,
			notaExamenFinal,
			promedio,
			estado,
		],
		(err, result) => {
			if (err) throw err
			console.log(result)
		}
	)
})

app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`)
})
