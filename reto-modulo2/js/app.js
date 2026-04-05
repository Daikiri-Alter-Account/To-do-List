import { Task } from './Task.js';

let tareas = [];
let filtroActual = 'all';

const inputTarea = document.getElementById('input-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const listaTareas = document.getElementById('lista-tareas');
const btnTodas = document.getElementById('btn-todas');
const btnCompletadas = document.getElementById('btn-completadas');
const btnPendientes = document.getElementById('btn-pendientes');
const contadorTotal = document.getElementById('contador-total');
const contadorCompletadas = document.getElementById('contador-completadas');

function agregarTarea(taskName) {
  const nombre = taskName.trim();
  if (!nombre) return;

  const nuevaTarea = new Task(nombre);
  tareas.push(nuevaTarea);
  mostrarTareas();
}

function eliminarTarea(taskId) {
  tareas = tareas.filter((tarea) => tarea.id !== taskId);
  mostrarTareas();
}

function filtrarTareas(completadas) {
  return tareas.filter((tarea) => tarea.completed === completadas);
}

function mostrarTareas() {
  let tareasVisibles;
  if (filtroActual === 'completed') {
    tareasVisibles = filtrarTareas(true);
  } else if (filtroActual === 'pending') {
    tareasVisibles = filtrarTareas(false);
  } else {
    tareasVisibles = [...tareas];
  }

  listaTareas.innerHTML = '';

  if (tareasVisibles.length === 0) {
    const vacio = document.createElement('li');
    vacio.className = 'empty-state';
    vacio.textContent = filtroActual === 'all'
      ? '¡Agrega tu primera tarea!'
      : 'No hay tareas en esta categoría';
    listaTareas.appendChild(vacio);
  }

  const elementos = tareasVisibles.map((tarea) => {
    const li = document.createElement('li');
    li.className = `tarea-item${tarea.completed ? ' completada' : ''}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarea.completed;
    checkbox.addEventListener('click', () => {
      tarea.toggleCompleted();
      mostrarTareas();
    });

    const span = document.createElement('span');
    span.className = 'tarea-nombre';
    span.textContent = tarea.name;
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnEliminar);
    return li;
  });

  elementos.forEach((el) => listaTareas.appendChild(el));

  const completadasCount = tareas.filter((t) => t.completed).length;
  contadorTotal.textContent = tareas.length;
  contadorCompletadas.textContent = completadasCount;
}

// Eventos

btnAgregar.addEventListener('click', () => {
  agregarTarea(inputTarea.value);
  inputTarea.value = '';
  inputTarea.focus();
});

inputTarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    agregarTarea(inputTarea.value);
    inputTarea.value = '';
  }
});

function setFiltro(filtro, btnActivo) {
  filtroActual = filtro;
  document.querySelectorAll('.filtro-btn').forEach((b) => b.classList.remove('activo'));
  btnActivo.classList.add('activo');
  mostrarTareas();
}

btnTodas.addEventListener('click', () => setFiltro('all', btnTodas));
btnCompletadas.addEventListener('click', () => setFiltro('completed', btnCompletadas));
btnPendientes.addEventListener('click', () => setFiltro('pending', btnPendientes));
mostrarTareas();
