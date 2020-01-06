const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoSubmit = toDoForm.querySelector(".submitBtn"),  
  deadlineInput = toDoForm.querySelector(".deadline"),
  toDoList = document.querySelector(".js-toDoList");

  const TODOS_LS = "toDos";
  const DEADLINE_LS = "deadline";

  function filterFn(toDo){
    return toDo.id === 1;
  }

  let toDos = [];

  function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos(toDos);
  }

  function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(DEADLINE_LS,JSON.stringify(toDos));
  }

  function paintToDo(text, deadlineText){
    const li = document.createElement("li")
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const deadlineSpan = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    deadlineSpan.innerText = deadlineText;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(deadlineSpan);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
      text: text,
      deadlineText: deadlineText,
      id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
  }

  function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    const currentDeadlineValue = deadlineInput.value;
    paintToDo(currentValue, currentDeadlineValue);
    toDoInput.value = "";
    deadlineInput.value = "";
  }


  function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedDeadLine = localStorage.getItem(DEADLINE_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
          //console.log(toDo.text);
          //console.log(toDo.deadlineText);
          paintToDo(toDo.text, toDo.deadlineText);
        });
    }

  }

  function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
  }

  init();
