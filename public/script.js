const inputBox = document.getElementById('search');
const taskList = document.getElementById('task-list');
const inputTime = document.getElementById('task-time');

document.getElementById('enable-notifications').onclick = () => {
    Notification.requestPermission();
};

function addTask() {
    if (inputBox.value === '') {
        alert("¡Escribe una tarea!");
        return;
    }

    let li = document.createElement("li");
    // Guardamos la hora en un atributo 'data' para leerla luego
    const timeValue = inputTime.value || "Sin hora";
    li.setAttribute('data-time', inputTime.value); 
    
    li.innerHTML = `${inputBox.value} <small class="text-muted">(${timeValue})</small>`;
    
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    
    taskList.appendChild(li);
    inputBox.value = "";
    inputTime.value = "";
    saveData();
}

function checkAlarms() {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const tasks = taskList.getElementsByTagName('li');
    for (let task of tasks) {
        const taskTime = task.getAttribute('data-time');
        const isChecked = task.classList.contains('checked');

        if (taskTime === currentTime && !isChecked) {
            sendNotification(task.innerText.replace('×', ''));
            task.classList.add('checked'); // La marcamos para que no suene infinitamente
            saveData();
        }
    }
}

function sendNotification(taskText) {
    if (Notification.permission === "granted") {
        new Notification("⏰ ¡Alarma de Tarea!", {
            body: `Es hora de: ${taskText}`,
            icon: "https://cdn-icons-png.flaticon.com/512/8028/8028200.png"
        });
        // Opcional: Sonido
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
    }
}

// Revisar cada 1 segundo
setInterval(checkAlarms, 1000);


    taskList.addEventListener("click", function (e) {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('checked');
            saveData();
        }else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData();
        }
    })

    function saveData() {
        localStorage.setItem("data", taskList.innerHTML);
    }

    function showTask() {
        taskList.innerHTML = localStorage.getItem("data");
    }

    showTask();