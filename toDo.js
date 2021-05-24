

(function () {
    let addToDoButton = document.getElementById('addToDo');
    let inputCategory = document.getElementById('add-new-category');
    let elementCategory = document.getElementById('left-element');
    let elementTask = document.getElementById('categoryTasks');
    const taskContainer = document.getElementById("task-list");
    const subTaskContainer = document.getElementById('sub-task-list');
    let categoryId;
    let taskId;
    const taskInput = document.getElementsByClassName("add-new-task")[0];
    const subTaskInput = document.getElementsByClassName("add-new-sub-task")[0];
    let assignedTasks = [];
    let assignedSubTasks = [];

    let list = [
        {
            id: 1,
            icon: "fa fa-sun",
            name: 'My Day',
        },
        {
            id: 2,
            icon: "fa fa-star",
            name: 'Important',
        },
        {
            id: 3,
            icon: "fa fa-calendar",
            name: 'Planned'
        },
        {
            id: 4,
            icon: "fa fa-user",
            name: 'Assign to you'
        },
        {
            id: 5,
            icon: "fa fa-home",
            name: 'Task'
        }
    ];

    /**
     * This is Initial Function, Loads First
     */
    function init() {
        document.getElementsByClassName("grid-center")[0].style.visibility = 'hidden';
        document.getElementsByClassName("grid-right")[0].style.visibility = 'hidden';

        addToDoButton.addEventListener('click', function () {
            addCategory();
        })

        inputCategory.addEventListener("keydown", function (event) {
            if (event.key == 'Enter') {
                addCategory();
            }
        });

        elementCategory.addEventListener('click', function (event) {

            if ("SPAN" === event.target.tagName) {
                task(event);
            }
        })

        elementTask.addEventListener('click', function (event){
            if ("SPAN" === event.target.tagName) {
                subTask(event);
            }

        })

        taskInput.addEventListener("keydown", function (event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });

        subTaskInput.addEventListener("keydown", function(event) {
            if(event.key === 'Enter') {
                addSubTask();
            }
        })

        document.getElementById('addTaskInList').addEventListener('click', function () {
            addTask();
        })

        document.getElementById('addSubTaskInList').addEventListener('click', function () {
            addSubTask();
        })
        categoryList();
    }

    /**
     * This function renders all available Categories by calling rendercategory function with Index
     */
    function categoryList() {
        for (let i = 0; i < list.length; i++) {
            renderCategory(list[i]);
        }
    }

    /**
     *  This function renders category based on index
     */
    function renderCategory(index) {
        const listCategory = document.getElementsByClassName('list')[0];
        const item = document.createElement('li');
        const icon = document.createElement("i");
        icon.className = index.icon;
        item.insertBefore(icon, item.firstChild);
        const span = document.createElement("span");
        span.className = "list-name";
        span.id = index.id;
        span.appendChild(item.appendChild(document.createTextNode(index.name)));
        item.insertBefore(span, icon.nextSibling);
        listCategory.appendChild(item);
        document.getElementById("left-element").appendChild(listCategory);
    }

    /**
     * this function adds a new category
     */
    function addCategory() {
        const addCategory = document.getElementById("add-new-category").value;

        if ("" !== addCategory) {
            let category = {
                id: list.length + 1,
                icon: 'fa fa-list',
                name: addCategory
            }
            list.push(category);
            renderCategory(category);
            document.getElementById("add-new-category").value = "";
        }
    }

    /**
     * this function  renders all available tasks by calling renderTask function with index
     * @param event onClick event for task
     */
    function task(event) {
        document.getElementsByClassName("grid-center")[0].style.visibility = 'visible';
        document.getElementsByClassName("grid-center")[0].style.width = "74%";
        document.getElementsByClassName("grid-right")[0].style.display = "none";
        categoryId = event.target.id;
        let categoryName = document.getElementsByClassName("category-name")[0];
        categoryName.innerHTML = document.getElementById(categoryId).innerHTML;
        taskContainer.innerHTML = "";

        for (let i = 0; i < assignedTasks.length; i++) {       
            if (categoryId == assignedTasks[i].id) {
                renderTask(assignedTasks[i]);
            }
        }
    }

    /**
     *  this function  renders all available sub tasks by calling renderSubTask function with index 
     *  @param event, onClick event for Sub Task
     */
    function subTask(event) {
        document.getElementsByClassName("grid-center")[0].style.width = "45%";
        document.getElementsByClassName("grid-right")[0].style.display = "inline-block";
        document.getElementsByClassName("grid-right")[0].style.visibility = 'visible';
        taskId = event.target.id;
        let taskName = document.getElementsByClassName("task-name")[0];
        taskName.innerHTML = document.getElementById(taskId).innerHTML;
        subTaskContainer.innerHTML="";

        for (let i = 0; i < assignedSubTasks.length; i++) {

            if (taskId == assignedSubTasks[i].id) {
                renderSubTask(assignedSubTasks[i]);
            }
        }
    }

    /**
     * this function render a task by index
     * @param index , index of list of tasks
     */
    function renderTask(index) {
        const task = document.createElement("li");
        const radioButton = document.createElement("input");
        const important = document.createElement('i');
        important.className = 'fa fa-star';
        radioButton.type = 'checkbox';
        radioButton.name = 'task-name';
        radioButton.className = 'check-list';
        task.insertBefore(radioButton, task.firstChild);
        const span = document.createElement("span");
        span.className = "assigned-task-value";
        span.id = index.taskId;
        span.appendChild(task.appendChild(document.createTextNode(index.name)));
        task.insertBefore(span, radioButton.nextSibling);
        task.appendChild(important);
        taskContainer.appendChild(task);
        document.getElementsByClassName("category-tasks")[0].appendChild(taskContainer);
    }

    /**
     * this function render a sub task by index
     * @param index , index of list of Sub tasks 
     */
    function renderSubTask(index) {
        const subTask = document.createElement("li");
        const radioButton = document.createElement("input");
        radioButton.type = 'checkbox';
        radioButton.name = 'sub-task-name';
        radioButton.className = 'check-list';
        subTask.insertBefore(radioButton, subTask.firstChild);
        const span = document.createElement("span");
        span.className = "assigned-sub-task-value";   
        span.appendChild(subTask.appendChild(document.createTextNode(index.name)));
        subTask.insertBefore(span, radioButton.firstChild);
        subTaskContainer.appendChild(subTask);
        document.getElementsByClassName("sub-tasks")[0].appendChild(subTaskContainer);
    }

    /**
     * this function adds a new task by user input
     */
    function addTask() {
        const taskValue = document.getElementsByClassName("add-new-task")[0].value;

        if ("" !== taskValue) {

            let task = {
                id: categoryId,
                taskId: "T" + assignedTasks.length + 1,
                name: taskValue
            }
            assignedTasks.push(task);
            renderTask(task);
        }
        document.getElementsByClassName("add-new-task")[0].value = "";
    }

    /**
     * this function adds a new sub task by user input
     */
    function addSubTask() {
        const subTaskValue = document.getElementsByClassName("add-new-sub-task")[0].value;

        if("" !== subTaskValue) {
            let subTask = {
                id:taskId ,
                name: subTaskValue
            }
            assignedSubTasks.push(subTask);
            renderSubTask(subTask);
        }
        document.getElementsByClassName("add-new-sub-task")[0].value = "";
    }
    init();
})();