//新增
const btnCreate = document.querySelector(".card--container-input .btn-create");
//待辦事項內容區
const toDoContent = document.querySelector(".card--container-content .content");
//輸入值
const myToDoInput = document.querySelector(".card--container-input input");
//計數區
const countDataContainer = document.querySelector(".card--container-count");
const doneDom = document.createElement("div");
const unDoneDom = document.createElement("div");
//清除完成
const btnClernDone = document.querySelector(".btn-clearDone");
//清除全部
const btnClearAll = document.querySelector(".btn-clearAll");
const save = (value) => {
  localStorage.setItem("list", JSON.stringify(value));
};

function toDo() {
  const toDoData = {
    id: new Date().getTime(),
    text: myToDoInput.value,
    complete: false,
  };

  const todoInput = document.createElement("div");
  const todoActions = document.createElement("div");
  const todoListContainer = document.createElement("div");
  const pen = document.createElement("div");
  const edit = document.createElement("div");
  const tick = document.createElement("div");
  const complete = document.createElement("div");
  //在更改樣式
  todoListContainer.insertAdjacentHTML(
    "afterbegin",
    `<input data-id=${toDoData.id} class='hide--contentInput' type='text'>`
  );

  todoInput.classList.add("content--input");
  todoListContainer.classList.add("content--toDoList-container");
  todoListContainer.classList.add("addToDo");
  todoActions.classList.add("content--actions");
  todoInput.dataset.id = toDoData.id;
  todoInput.innerText = toDoData.text;
  tick.innerText = "🗑";
  tick.classList.add("isTick");
  //儲存
  edit.addEventListener("click", (e) => {
    const updateInput = document.querySelector(
      `[data-id="${toDoData.id}"].content--input`
    );
    edit.classList.toggle("isEdit");
    pen.classList.toggle("isEdit");

    let arrayToDo = JSON.parse(localStorage.getItem("list"));
    const id = Number(
      e.target.parentElement.parentElement.children[0].dataset.id
    );

    if (id === toDoData.id) {
      const updateId = Number(
        e.target.parentElement.parentElement.children[0].dataset.id
      );
      if (updateId === Number(updateInput.dataset.id)) {
        const updateCheck = arrayToDo.filter((arr) => arr.id === toDoData.id);
        updateCheck[0].text = updateInput.value;
        save(arrayToDo);

        //儲存完刪除更新介面
        todoInput.classList.remove("hide--contentInput");
        todoInput.classList.add("content--input");
        updateInput.classList.remove("content--input");
        updateInput.classList.add("hide--contentInput");

        todoInput.innerText = updateInput.value;
        toDoData.text = updateInput.value;
      }
    }
  });
  pen.addEventListener("click", (e) => {
    const updateInput = document.querySelector(
      `[data-id="${toDoData.id}"].hide--contentInput`
    );
    edit.classList.toggle("isEdit");
    pen.classList.toggle("isEdit");
    todoInput.classList.toggle("content--input");
    todoInput.classList.toggle("hide--contentInput");
    updateInput.classList.toggle("hide--contentInput");
    updateInput.classList.toggle("content--input");
    updateInput.value = toDoData.text;
  });

  let myToDo = JSON.parse(localStorage.getItem("list"));
  //刪除
  tick.addEventListener("click", (e) => {
    let myToDo = JSON.parse(localStorage.getItem("list"));
    const delDom = e.target.parentElement.parentElement;
    const checkDel = e.target.parentElement.parentElement.children[1].innerText;
    todoListContainer.classList.remove("addToDo");
    delDom.classList.add("delToDo");
    myToDo.forEach((arr, index) => {
      if (arr.text == checkDel) {
        myToDo.splice(index, 1);
        save(myToDo);
        doneDom.remove();
        unDoneDom.remove();
        loadCount();
      }
    });
    setTimeout(() => {
      delDom.remove();
    }, 100);
  });
  if (myToDo === null) {
    save([toDoData]);
  } else {
    let arrayToDo = JSON.parse(localStorage.getItem("list"));
    arrayToDo.push(toDoData);
    save(arrayToDo);

    doneDom.remove();
    unDoneDom.remove();
    loadCount();
  }
  //完成
  complete.addEventListener("click", (e) => {
    let myToDo = JSON.parse(localStorage.getItem("list"));
    const doneText = e.target.parentElement.parentElement.children[1];

    doneText.classList.toggle("done-text");
    doneText.classList.remove("unDone-text");
    if (doneText.attributes.class.value.includes("done-text")) {
      myToDo.forEach((arr, index) => {
        if (arr.id == doneText.dataset.id) {
          arr.complete = true;
          save(myToDo);
          doneDom.remove();
          unDoneDom.remove();
          loadCount();
        }
      });
    } else {
      myToDo.forEach((arr, index) => {
        if (arr.id == doneText.dataset.id) {
          doneText.classList.add("unDone-text");
          arr.complete = false;
          save(myToDo);
          doneDom.remove();
          unDoneDom.remove();
          loadCount();
        }
      });
    }
  });
  pen.innerText = "🖊";
  edit.innerText = "💾";
  edit.classList.add("isEdit");
  complete.innerText = "✔";
  complete.classList.add("undone");
  todoActions.appendChild(pen);
  todoActions.appendChild(edit);
  todoActions.appendChild(tick);
  todoActions.appendChild(complete);
  todoListContainer.appendChild(todoInput);
  todoListContainer.appendChild(todoActions);
  toDoContent.appendChild(todoListContainer);
}

function loadToDo() {
  let loadList = JSON.parse(localStorage.getItem("list"));
  if (loadList === null) return;

  loadList.forEach((list) => {
    const todoInput = document.createElement("div");
    const todoActions = document.createElement("div");
    const todoListContainer = document.createElement("div");
    const pen = document.createElement("div");
    const edit = document.createElement("div");
    const tick = document.createElement("div");
    const complete = document.createElement("div");
    //在更改樣式
    todoListContainer.insertAdjacentHTML(
      "afterbegin",
      `<input data-id=${list.id} class='hide--contentInput' type='text'>`
    );

    todoInput.classList.add("content--input");
    todoListContainer.classList.add("content--toDoList-container");
    todoActions.classList.add("content--actions");
    todoInput.dataset.id = list.id;
    todoInput.innerText = list.text;
    if (list.complete) {
      todoInput.classList.add("done-text");
    }
    tick.innerText = "🗑";
    tick.classList.add("isTick");
    //儲存
    edit.addEventListener("click", (e) => {
      const updateInput = document.querySelector(
        `[data-id="${list.id}"].content--input`
      );
      edit.classList.toggle("isEdit");
      pen.classList.toggle("isEdit");

      let arrayToDo = JSON.parse(localStorage.getItem("list"));
      const id = Number(
        e.target.parentElement.parentElement.children[0].dataset.id
      );

      if (id === list.id) {
        const updateId = Number(
          e.target.parentElement.parentElement.children[0].dataset.id
        );
        if (updateId === Number(updateInput.dataset.id)) {
          const updateCheck = arrayToDo.filter((arr) => arr.id === list.id);
          updateCheck[0].text = updateInput.value;
          save(arrayToDo);

          //儲存完刪除更新介面
          todoInput.classList.remove("hide--contentInput");
          todoInput.classList.add("content--input");
          updateInput.classList.remove("content--input");
          updateInput.classList.add("hide--contentInput");

          todoInput.innerText = updateInput.value;
          list.text = updateInput.value;
        }
      }
    });
    pen.addEventListener("click", (e) => {
      const updateInput = document.querySelector(
        `[data-id="${list.id}"].hide--contentInput`
      );
      edit.classList.toggle("isEdit");
      pen.classList.toggle("isEdit");
      todoInput.classList.toggle("content--input");
      todoInput.classList.toggle("hide--contentInput");
      updateInput.classList.toggle("hide--contentInput");
      updateInput.classList.toggle("content--input");
      updateInput.value = list.text;
    });

    //刪除
    tick.addEventListener("click", (e) => {
      let myToDo = JSON.parse(localStorage.getItem("list"));
      const delDom = e.target.parentElement.parentElement;
      const checkDel =
        e.target.parentElement.parentElement.children[1].innerText;

      delDom.classList.add("delToDo");
      myToDo.forEach((arr, index) => {
        if (arr.text == checkDel) {
          myToDo.splice(index, 1);
          save(myToDo);
          doneDom.remove();
          unDoneDom.remove();
          loadCount();
        }
      });
      setTimeout(() => {
        delDom.remove();
      }, 100);
    });

    //完成
    complete.addEventListener("click", (e) => {
      let myToDo = JSON.parse(localStorage.getItem("list"));
      const doneText = e.target.parentElement.parentElement.children[1];
      doneText.classList.toggle("done-text");
      doneText.classList.remove("unDone-text");
      if (doneText.attributes.class.value.includes("done-text")) {
        myToDo.forEach((arr, index) => {
          if (arr.id == doneText.dataset.id) {
            arr.complete = true;
            save(myToDo);
            doneDom.remove();
            unDoneDom.remove();
            loadCount();
          }
        });
      } else {
        myToDo.forEach((arr, index) => {
          if (arr.id == doneText.dataset.id) {
            doneText.classList.add("unDone-text");
            arr.complete = false;
            save(myToDo);
            doneDom.remove();
            unDoneDom.remove();
            loadCount();
          }
        });
      }
    });

    pen.innerText = "🖊";
    edit.innerText = "💾";
    edit.classList.add("isEdit");
    complete.innerText = "✔";
    complete.classList.add("undone");
    todoActions.appendChild(pen);
    todoActions.appendChild(edit);
    todoActions.appendChild(tick);
    todoActions.appendChild(complete);
    todoListContainer.appendChild(todoInput);
    todoListContainer.appendChild(todoActions);
    toDoContent.appendChild(todoListContainer);
  });
}

function loadCount() {
  const doneCount = [];
  const unDoneCount = [];

  const myToDo = JSON.parse(localStorage.getItem("list"));
  if (myToDo === null) {
    save([]);
    doneDom.innerText = `完成:${doneCount.length}`;
    unDoneDom.innerText = `待完成:${unDoneCount.length}`;
    countDataContainer.appendChild(doneDom);
    countDataContainer.appendChild(unDoneDom);
  }
  myToDo.filter((arr) => {
    if (arr.complete) {
      doneCount.push(arr.complete);
    } else {
      unDoneCount.push(arr.complete);
    }
  });
  doneDom.innerText = `完成:${doneCount.length}`;
  unDoneDom.innerText = `待完成:${unDoneCount.length}`;
  countDataContainer.appendChild(doneDom);
  countDataContainer.appendChild(unDoneDom);
}

btnCreate.addEventListener("click", () => {
  if (myToDoInput.value === "") {
    alert("內容不可為空!!");
    return;
  }

  toDo();
  myToDoInput.value = "";
});

btnClernDone.addEventListener("click", (e) => {
  toDoContent.classList.add("delToDo");
  let myToDo = JSON.parse(localStorage.getItem("list"));
  const unDone = myToDo.filter((arr) => arr.complete === false);
  const checkAni = unDone.map((arr) => {
    if (arr.complete === false) {
      return false;
    } else {
      return true;
    }
  });
  save(unDone);
  if (!checkAni) {
    setTimeout(() => {
      toDoContent.innerHTML = "";
      loadToDo();

      doneDom.remove();
      unDoneDom.remove();
      loadCount();
      toDoContent.classList.remove("delToDo");
    }, 100);
  } else {
    toDoContent.innerHTML = "";
    loadToDo();

    doneDom.remove();
    unDoneDom.remove();
    loadCount();
    toDoContent.classList.remove("delToDo");
  }
});

btnClearAll.addEventListener("click", () => {
  const empty = [];
  toDoContent.classList.add("delToDo");
  save(empty);
  setTimeout(() => {
    toDoContent.innerHTML = "";
    loadToDo();
    doneDom.remove();
    unDoneDom.remove();
    loadCount();
    toDoContent.classList.remove("delToDo");
  }, 100);
});
loadToDo();
loadCount();
