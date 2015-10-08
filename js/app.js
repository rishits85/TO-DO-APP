var taskInput = document.getElementById("new-task");// new task
var addButton = document.getElementsByTagName("button")[0];// button
var incompleteTasksHolder = document.getElementById("incomplete-tasks");//incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks");// complete tasks

var createNewTaskElement = function(taskString){
    //create listItem
    var listItem = document.createElement("li");
    // input checkbox 
    var checkbox = document.createElement("input");
    //create label 
    var label = document.createElement("label");
    //create text
    var editInput = document.createElement("input");
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
    //each elements needs modified 
    
  checkbox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;
  
  //each element needs appending append
    listItem.appendChild(checkbox);
    if (taskString !== ""){
    listItem.appendChild(label); 
    } else{
    }
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
  
  return listItem;
}
//add tasK
var addTask = function(){
  console.log("add");
  // when button pressed
  //create a new list item with text form #new-task
     var listItem = createNewTaskElement(taskInput.value) ;
  //Append to incomplete task holder
     incompleteTasksHolder.appendChild(listItem);
     bindTaskEvents(listItem, taskComplete);
    taskInput.value = "";
}

//edit existing task
  var editTask = function(){
    console.log("edit");
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    //if class of parent is .editMode
      if (containsClass){
        //switch from edit mode      
      //label text becomes input value
        label.innerText = editInput.value
        this.innerText = "Edit";
      } 
      
    else{
      // switch to edit mode if not in it
      //input value is labels text
      editInput.value = label.innerText;
      this.innerText = "Save";
      //toggle editmode
    }
    listItem.classList.toggle("editMode");
  }
//delete an existing task
var deleteTask = function(){
  console.log("delete")
  //remove parent list item from the ol
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//mark a task as complete
var taskComplete = function(){
    console.log("complete")
    //append task to #complete-task
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskIncomplete);

}

//mark a task as incomplete
var taskIncomplete = function(){
   console.log("incomplete")
  //append to incomplete task
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskComplete);
  
}
var bindTaskEvents = function(taskListItem , checkBoxEventHandler){
  console.log("bind");
  //select its children
    var checkbox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    //bind editTask to edit button
      editButton.onclick = editTask;
  
    //bind deleteTask to deleteButton
      deleteButton.onclick = deleteTask
      
    //bind checkBoxEventHandler to checkbox
      checkbox.onchange = checkBoxEventHandler;
}
      var ajaxRequest = function(){
        console.log("ajax");
      }
// set the click handler to the add task function

  addButton.addEventListener("click", addTask);
  addButton.addEventListener("click", ajaxRequest);
// no () put across addTask as it will call the function right there. not putting brackets will call it on clickeing button

// cycle through incompleteTasksHolder ul list items
  for (var i = 0; i<incompleteTasksHolder.children.length; i++){
    //bind events to list items children selector(taskCompleted)    
    bindTaskEvents(incompleteTasksHolder.children[i], taskComplete);
  }

// cycle through completeTasksHolder ul list items
  for (var i = 0; i<completedTasksHolder.children.length; i++){
   //bind events to list items children selector(taskIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }