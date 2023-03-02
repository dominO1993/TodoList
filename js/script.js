let $todoInput;
let $addBtn;
let $alertInfo;
let $ulList;
let $allTasks;
let $newTask;

let $popup;
let $popupInfo;
let $popupInput;
let $popupAcceptBtn;
let $popupCancelBtn;
let idNumber = 0;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	$todoInput = document.querySelector('.todo__input');
	$addBtn = document.querySelector('.todo__add-btn');
	$alertInfo = document.querySelector('.todo__alert-info');
	$ulList = document.querySelector('ul');
	$allTasks = document.getElementsByTagName('li');
	$popup = document.querySelector('.popup');
	$popupInfo = document.querySelector('.popup__info');
	$popupInput = document.querySelector('.popup__input');
	$popupAcceptBtn = document.querySelector('.popup__accept-btn');
	$popupCancelBtn = document.querySelector('.popup__cancel-btn');
};

const prepareDOMEvents = () => {
	$addBtn.addEventListener('click', addNewTask);
	$ulList.addEventListener('click', checkClick);
	$popupAcceptBtn.addEventListener('click', changeTodo);
	$popupCancelBtn.addEventListener('click', closePopup);
	$todoInput.addEventListener('keyup', addTodoByKey);
};

const addNewTask = () => {
	if ($todoInput.value !== '') {
		idNumber++;
		$newTask = document.createElement('li');
		$newTask.classList.add('todo__item');
		$newTask.textContent = $todoInput.value;
		$newTask.setAttribute('id', idNumber);
		$ulList.append($newTask);
		$todoInput.value = '';
		$alertInfo.textContent = '';
		createToolsArea();
	} else {
		$alertInfo.textContent = 'Musisz wpisać treść zadania!';
	}
};

const createToolsArea = () => {
	const tools = document.createElement('div');
	tools.classList.add('todo__tools');
	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';
	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDIT';
	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	tools.append(completeBtn, editBtn, deleteBtn);
	$newTask.append(tools);
};

const checkClick = e => {
	if (e.target.classList.value !== '') {
		if (e.target.closest('button').classList.contains('complete')) {
			e.target.closest('li').classList.toggle('completed');
			e.target.closest('button').classList.toggle('completed');
		} else if (e.target.closest('button').classList.contains('edit')) {
			editTodo(e);
		} else if (e.target.closest('button').classList.contains('delete')) {
			deleteTask(e);
		}
	}
};

const editTodo = e => {
	const oldTodo = e.target.closest('li').id;
	$editedTodo = document.getElementById(oldTodo);
	$popup.style.display = 'block';
	$popupInput.value = $editedTodo.firstChild.textContent;
};

const changeTodo = () => {
	if ($popupInput.value !== '') {
		$editedTodo.firstChild.textContent = $popupInput.value;
		closePopup();
	} else {
		$popupInfo.textContent = 'Musisz wpisać jakąś treść!';
	}
};

const deleteTask = e => {
	const deleteTodo = e.target.closest('li');
	deleteTodo.remove();

	if ($allTasks.length === 0) {
		$alertInfo.textContent = 'Brak zadań na liście';
	}
};

const closePopup = () => {
	$popup.style.display = 'none';
	$popupInfo.textContent = '';
};

const addTodoByKey = e => {
	if (e.code === 'Enter') {
		addNewTask();
	}
};

document.addEventListener('DOMContentLoaded', main);
