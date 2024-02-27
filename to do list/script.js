// Função para adicionar uma nova tarefa à lista
function addTask() {
    var taskInput = document.getElementById('task-input');
    var taskText = taskInput.value.trim();

    if (taskText !== '') {
        var taskList = document.getElementById('task-list');
        var newTask = document.createElement('li');
        newTask.textContent = taskText;
        taskList.appendChild(newTask);
        taskInput.value = ''; // Limpa o campo de entrada após adicionar a tarefa
    }
}

// Função para remover a tarefa selecionada da lista
function removeTask() {
    var taskList = document.getElementById('task-list');
    var selectedTask = taskList.querySelector('li');

    if (selectedTask) {
        taskList.removeChild(selectedTask);
    }
}
