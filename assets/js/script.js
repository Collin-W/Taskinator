var taskIdCounter = 0;


var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } 

   // package up data as an object
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
    createTaskEl(taskDataObj);
  }
} 
var createTaskEl = function(taskDataObj) {
// create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

// add task id as a custom attribuite
listItemEl.setAttribute("data-task-id", taskIdCounter);


// create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");

// give it a class name
taskInfoEl.className = "task-info";

// add HTML content to div
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

listItemEl.appendChild(taskInfoEl);

var taskActionsEl = createTaskActions(taskIdCounter);

listItemEl.appendChild(taskActionsEl);

// add entire list item to list
tasksToDoEl.appendChild(listItemEl);

//increase task counter for the next unique id
taskIdCounter++;
};


var completeEditTask = function(taskName, taskType, taskId) {
   // find the matching task list item
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// set new values
taskSelected.querySelector("h3.task-name").textContent = taskName;
taskSelected.querySelector("span.task-type").textContent = taskType;

alert("Task Updated!");

formEl.removeAttribute("data-task-id");
document.querySelector("#save-task").textContent = "Add Task";
  };


var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;

};

formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
      // get target element from event
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } 
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
  
};

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    formEl.setAttribute("data-task-id", taskId);

    // get task list item element
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// get content from task name and type
var taskName = taskSelected.querySelector("h3.task-name").textContent;
console.log(taskName);

var taskType = taskSelected.querySelector("span.task-type").textContent;
document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;
document.querySelector("#save-task").textContent = "Save Task";
};

var taskStatusChangeHandler = function(event) {
 // get the task item's id
 var taskId = event.target.getAttribute("data-task-id");

 // get the currently selected option's value and convert to lowercase
 var statusValue = event.target.value.toLowerCase();

 // find the parent task item element based on the id
 var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

 if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
  };

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);





/* There are several pieces in that for loop that might warrant a refresher. Let's break it down:

var i = 0 defines an initial counter, or iterator, variable
i < statusChoices.length keeps the for loop running by checking the iterator against the number of items in the array (length being the property that returns the number of items)
i++ increments the counter by one after each loop iteration
statusChoices[i] returns the value of the array at the given index (for example, when i = 0, or statusChoices[0], we get the first item) */



/* In the past, we've used querySelector() with the document object, but any DOM element can use this method. document.querySelector() searches within the document element, which is the entire page, while taskSelected.querySelector() only searches within the tastSelected element. Thus, we can narrow our search to the task item at hand to find its name (h3.task-name) and type (span.task-type). */