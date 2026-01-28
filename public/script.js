// 1. CONFIGURACIÓN Y SELECTORES
const DOM = {
    inputBox: document.getElementById('search'),
    taskList: document.getElementById('task-list'),
    inputTime: document.getElementById('task-time'),
    btnNotifications: document.getElementById('enable-notifications')
};

// 2. MÓDULO DE PERSISTENCIA
const StorageManager = {
    save: () => {
        localStorage.setItem("data", DOM.taskList.innerHTML);
        //console.log("%c[Storage] Datos guardados en localStorage", "color: #4CAF50; font-weight: bold;");
    },
    load: () => {
        DOM.taskList.innerHTML = localStorage.getItem("data") || "";
        //console.log("%c[Storage] Datos cargados", "color: #4CAF50; font-weight: bold;");
    }
};

// 3. MÓDULO DE NOTIFICACIONES
const NotificationManager = {
    requestPermission: () => {
        //console.log("[Notificaciones] Solicitando permiso...");
        Notification.requestPermission().then(perm => console.log(`[Notificaciones] Permiso: ${perm}`));
    },
    
    send: (taskText) => {
        //console.log(`%c[Alarma] Disparando notificación para: ${taskText}`, "color: #FF5722; font-weight: bold;");
        if (Notification.permission === "granted") {
            new Notification("⏰ ¡Alarma!", { body: `Es hora de: ${taskText}` });
            new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
        }
    },

    checkAlarms: () => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        const tasks = DOM.taskList.querySelectorAll('li:not(.checked)');
        tasks.forEach(task => {
            const taskTime = task.getAttribute('data-time');
            
            // Añadimos una bandera temporal para que no suene dos veces en el mismo minuto
            if (taskTime === currentTime && task.dataset.lastNotified !== currentTime) {
                NotificationManager.send(task.innerText.replace('×', ''));
                task.classList.add('checked');
                task.dataset.lastNotified = currentTime; // Marcamos el minuto exacto del aviso
                StorageManager.save();
            }
        });
    }
};

// 4. MÓDULO DE TAREAS
const TaskManager = {
    add: () => {
        //console.log("[Task] Intentando agregar nueva tarea...");
        const text = DOM.inputBox.value;
        const time = DOM.inputTime.value;

        if (text === '') {
            console.warn("[Task] Intento de agregar tarea vacía");
            return alert("¡Escribe una tarea!");
        }

        const li = document.createElement("li");
        li.setAttribute('data-time', time); 
        li.innerHTML = `${text} <small class="text-muted">(${time || "Sin hora"})</small><span>\u00d7</span>`;
        
        DOM.taskList.appendChild(li);
        DOM.inputBox.value = "";
        DOM.inputTime.value = "";
        
        /*console.log(`%c[Task] Tarea creada: ${text} a las ${time}`, "color: #2196F3");*/
        StorageManager.save();
    },

    handleAction: (e) => {
        if (e.target.tagName === 'LI') {
            //console.log("[UI] Click en lista: Alternando estado 'completado'");
            e.target.classList.toggle('checked');
        } else if (e.target.tagName === "SPAN") {
            //console.log("[UI] Click en eliminar: Removiendo elemento");
            e.target.parentElement.remove();
        }
        StorageManager.save();
    }
};

// 5. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    //console.log("%c--- Aplicación Iniciada ---", "background: #333; color: #fff; padding: 5px;");
    StorageManager.load();
    
    DOM.btnNotifications.onclick = NotificationManager.requestPermission;
    DOM.taskList.onclick = TaskManager.handleAction;
    
    // Verificación de alarmas cada segundo
    setInterval(() => {
        // No ponemos log aquí para no saturar la consola cada segundo, 
        // pero sí lo hará cuando encuentre una alarma.
        NotificationManager.checkAlarms();
    }, 1000);
});