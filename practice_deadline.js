const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoSubmit = toDoForm.querySelector(".submitBtn"),  
  deadlineInput = toDoForm.querySelector(".deadline"),
  toDoList = document.querySelector(".js-toDoList");

  const TODOS_LS = "toDos";
  const DEADLINE_LS = "deadline";
  let REMAIN_PERIOD_MONTH, REMAIN_PERIOD_DATE;

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
  }

  function remainPeriod(deadlineText){
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentDate = date.getDate();
    const currentYear = date.getFullYear();
    const deadlineStr = `${deadlineText}`;
    const deadlineSplit = deadlineStr.split('.',2);
    const deadDate = new Date(currentYear, deadlineSplit[0]-1, deadlineSplit[1] ); // date() 에서 month는 0 부터 시작하므로 월에 -1 해줌
    const gapDate = deadDate - date;
    const period = Math.ceil(gapDate / (60*1000*60*24));
    REMAIN_PERIOD_DATE = period;
    console.log(REMAIN_PERIOD_DATE);
  }

  function paintToDo(text, deadlineText){
    remainPeriod(deadlineText); // 남은 기간 계산
    const li = document.createElement("li")
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const deadlineSpan = document.createElement("span");
    const remainPeriodMonthSpan = document.createElement("span");
    const remainPeriodDateSpan = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    deadlineSpan.innerText = `~ ${deadlineText}`;
    //remainPeriodMonthSpan.innerText = `${REMAIN_PERIOD_MONTH}개월`;
    remainPeriodDateSpan.innerText = ` ${REMAIN_PERIOD_DATE}일 남음`;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(deadlineSpan);
    //li.appendChild(remainPeriodMonthSpan);
    li.appendChild(remainPeriodDateSpan);
    li.id = newId;
    /* span class 설정 */
    span.classList.add("practiceName");
    deadlineSpan.classList.add("deadlineClass");
    /* */
    toDoList.appendChild(li);
    const toDoObj = {
      text: text,
      deadlineText: deadlineText,
      //remainPeriodMonth: REMAIN_PERIOD_MONTH,
      remainPeriodDate: REMAIN_PERIOD_DATE,
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
