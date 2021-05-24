

(function () {
    let addToDoButton = document.getElementById('add-to-do');
    let inputCategory = document.getElementById('add-new-category');
    let elementCategory = document.getElementById('left-element');
    let elementTask = document.getElementById('category-tasks');
    const taskContainer = document.getElementById("task-list");
    const subTaskContainer = document.getElementById('sub-task-list');
    let categoryId;
    let taskId;
    const taskInput = document.getElementsByClassName("add-new-task")[0];
    const subTaskInput = document.getElementsByClassName("add-new-sub-task")[0];
    let assignedTasks = [];
    let assignedSubTasks = [];
    let flag = 0;

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
        document.getElementsByClassName("center-container")[0].style.visibility = 'hidden';
        document.getElementsByClassName("right-container")[0].style.visibility = 'hidden';

        addToDoButton.addEventListener('click', addCategory);  // function () {
        //     addCategory();
        // })

        inputCategory.addEventListener("keydown", function (event) {
            if (event.key == 'Enter') {
                addCategory();
            }
        });

        elementCategory.addEventListener('click', function (event) {
            if ("SPAN" === event.target.tagName) {
                displayTask(event);
            }
        })

        elementTask.addEventListener('click', function (event) {
            if ("SPAN" === event.target.tagName) {
                displaySubTask(event);
            }
        })

        taskInput.addEventListener("keydown", function (event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });

        subTaskInput.addEventListener("keydown", function (event) {
            if (event.key === 'Enter') {
                addSubTask();
            }
        })

        document.getElementById('add-task').addEventListener('click', addTask); //function () {
        //     addTask();
        // })

        document.getElementById('add-sub-task').addEventListener('click', addSubTask); //function () {
        //     addSubTask();
        // })
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
    // function renderCategory(index) {
    //     const listCategory = document.getElementsByClassName('list')[0];
    //     const item = document.createElement('li');
    //     const icon = document.createElement("i");
    //     icon.className = index.icon;
    //     item.insertBefore(icon, item.firstChild);
    //     const span = document.createElement("span");
    //     span.className = "list-name";
    //     span.id = index.id;
    //     span.appendChild(item.appendChild(document.createTextNode(index.name)));
    //     item.insertBefore(span, icon.nextSibling);
    //     listCategory.appendChild(item);
    //     document.getElementById("left-element").appendChild(listCategory);
    // }

    function renderCategory(index) {
        const listCategory = $('.list');
        const item = $('<li/>');
        const icon = $('<i/>').addClass(index.icon).appendTo(item);
        const span = $('<span/>').addClass("list-name").attr('id', index.id).text(index.name).appendTo(item);
        item.appendTo(listCategory);
    }

    /**
     * this function adds a new category
     */
    // function addCategory() {
    //     const addCategory = document.getElementById("add-new-category").value;

    //     if ("" !== addCategory) {
    //         let category = {
    //             id: list.length + 1,
    //             icon: 'fa fa-list',
    //             name: addCategory
    //         }
    //         list.push(category);
    //         renderCategory(category);
    //         document.getElementById("add-new-category").value = "";
    //     }
    // }
    function addCategory() {
        let addCategory = $("#add-new-category").val();
        if ("" !== addCategory) {
            let category = {
                id: list.length + 1,
                icon: 'fa fa-list',
                name: addCategory
            }
            list.push(category);
            renderCategory(category);
        }
        addCategory = "";
    }

    /**
     * this function  renders all available tasks by calling renderTask function with index
     * @param event onClick event for task
     */
    function displayTask(event) {
        document.getElementsByClassName("center-container")[0].style.visibility = 'visible';
        document.getElementsByClassName("center-container")[0].style.width = "74%";
        document.getElementsByClassName("right-container")[0].style.display = "none";
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
    function displaySubTask(event) {
        document.getElementsByClassName("center-container")[0].style.width = "45%";
        document.getElementsByClassName("right-container")[0].style.display = "inline-block";
        document.getElementsByClassName("right-container")[0].style.visibility = 'visible';
        taskId = event.target.id;
        let taskName = document.getElementsByClassName("task-name")[0];
        taskName.innerHTML = document.getElementById(taskId).innerHTML;
        subTaskContainer.innerHTML = "";

        for (let i = 0; i < assignedSubTasks.length; i++) {

            if (taskId == assignedSubTasks[i].id) {
                renderSubTask(assignedSubTasks[i]);
            }
        }
        let a = document.getElementsByClassName('sub-task-check')[0];
        a.name = taskId;
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
        radioButton.name = index.taskId;
        radioButton.className = 'check-list';
        radioButton.id = 'check-task';
        task.insertBefore(radioButton, task.firstChild);
        const span = document.createElement("span");
        span.className = "assigned-task-value";
        span.id = index.taskId;
        span.appendChild(task.appendChild(document.createTextNode(index.name)));
        task.insertBefore(span, radioButton.nextSibling);
        task.appendChild(important);
        taskContainer.appendChild(task);
        document.getElementsByClassName("category-tasks")[0].appendChild(taskContainer);

        document.getElementById("check-task").addEventListener('click', function (event) {
            removeTask(event, this);
        })

        // document.getElementsByClassName('fa fa-star').addEventListener('click', function(event){
        //     taskImportant(event);
        // })
    }

    // function renderTask(index) {
    //     const tasks = $('category-tasks');
    //     const task = $('<li/>');
    //     const radioButton = $('<input type="checkbox" />').attr('name', index.taskId)
    //     .addClass('check-list').attr('id', 'check-task').appendTo(task);
    //     const span = $('<span/>').addClass('assigned-task-value').attr('id', index.taskId)
    //     .text(index.name).appendTo(task);
    //     const impotant = $('<i/>').addClass('far fa-star important').appendTo(task);
    //     task.appendTo(tasks);
    //     alert(task.innerText);
    // } 

    /**
     * this function render a sub task by index
     * @param index , index of list of Sub tasks 
     */
    function renderSubTask(index) {
        const subTask = document.createElement("li");
        const radioButton = document.createElement("input");
        radioButton.type = 'checkbox';
        radioButton.name = index.id;
        radioButton.className = 'check-list';
        radioButton.id = 'check-sub-task';
        subTask.insertBefore(radioButton, subTask.firstChild);
        const span = document.createElement("span");
        //    span.id = index.id;
        //    alert(span.id);
        span.className = "assigned-sub-task-value";
        span.appendChild(subTask.appendChild(document.createTextNode(index.name)));
        subTask.insertBefore(span, radioButton.firstChild);
        subTaskContainer.appendChild(subTask);
        document.getElementsByClassName("sub-tasks")[0].appendChild(subTaskContainer);
    }

    /**
     * this function adds a new task by user input
     */
    // function addTask() {
    //     const taskValue = document.getElementsByClassName("add-new-task")[0].value;

    //     if ("" !== taskValue) {

    //         let task = {
    //             id: categoryId,
    //             taskId: "T" + assignedTasks.length + 1,
    //             name: taskValue
    //         }
    //         assignedTasks.push(task);
    //         renderTask(task);
    //     }
    //     document.getElementsByClassName("add-new-task")[0].value = "";
    // }
    function addTask() {
        let taskValue = $(".add-new-task").val();
        if ("" !== taskValue) {

            let task = {
                id: categoryId,
                taskId: "T" + assignedTasks.length + 1,
                name: taskValue
            }
            assignedTasks.push(task);
            renderTask(task);
            taskValue = "";
        }
        
    }

    /**
     * this function adds a new sub task by user input
     */
    // function addSubTask() {
    //     const subTaskValue = document.getElementsByClassName("add-new-sub-task")[0].value;

    //     if ("" !== subTaskValue) {
    //         let subTask = {
    //             id: taskId,
    //             name: subTaskValue
    //         }
    //         assignedSubTasks.push(subTask);
    //         renderSubTask(subTask);
    //     }
    //     document.getElementsByClassName("add-new-sub-task")[0].value = "";
    // }
    function addSubTask() {
        let subTaskValue = $(".add-new-sub-task").val();

        if ("" !== subTaskValue) {
            let subTask = {
                id: taskId,
                name: subTaskValue
            }
            assignedSubTasks.push(subTask);
            renderSubTask(subTask);
        }
        subTaskValue = "";
    }

    function removeTask(event, v) {
        let checkboxes = document.getElementsByName(event.target.getAttribute('name'));
        // console.log(v.checked);
        // if (v.checked == true) {
        //     alert("in if");
        //     for (var i = 0; i < checkboxes.length; i++) { 
        //       checkboxes[i].checked = true;
        //     }
        //   } else {
        //     alert("in else");
        //     for (var i = 0; i < checkboxes.length; i++) {
        //       checkboxes[i].checked = false;
        //     }
        //   }

        if (checkboxes[0].checked == true) {

            for (i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
            }
        } else {
            for (i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
        }

        // for (i = 0; i < checkboxes.length; i++) {

        //     if (checkboxes[i].checked == true) {
        //         for (j = 1; j < checkboxes.length; j++) {
        //         checkboxes[i].checked = true;
        //         alert("hi");
        //         }
        //     } else {
        //         alert("else");
        //         checkboxes[i].checked = false;
        //     }
        // }


        // for (i = 0; i < checkboxes.length; i++) {
        //     checkboxes[i].checked = true;
        //     // if (checkboxes[0].checked == true) {
        //     // checkboxes[i].checked = true;
        //     // } else {
        //     //     checkboxes[i].checked = false;  
        //     // }
        // }



        //    // const checkTask = docuement.getElementById('check-task');
        //     if ((document.getElementById("check-task")).checked == true){
        //         let avb = document.getElementById("check-task").nextSibling.id;
        //         document.getElementById(avb).style.textDecoration = 'line-through';
        //         console.log(avb);
        //        // avb.style("textDecoration" , "line-through");
        //       } else {
        //         let avb = document.getElementById("check-task").nextSibling.id;
        //         document.getElementById(avb).style.textDecoration = "none";
        //       }
    }

    // function taskImportant(event) {
    //     alert(event.target.id);
    //     let bd = event.target.id;
    //     Document.getElementById( event.target.id).style.color = "yellow";

    //     if(bd. == Document.getElementsByClassName('task-name')) {

    //     }
    // }
    init();
})();