// const box = document.getElementById('colorBox');
// const button = document.getElementById('generateBtn');

// function getRandomColor() {
//   const r = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   return `rgb(${r}, ${g}, ${b})`;
// }

// button.addEventListener('click', () => {
//   const newColor = getRandomColor();
//   box.style.backgroundColor = newColor;
//   box.textContent = newColor; // Show RGB code inside the box
// });



// let box=document.querySelector(".box");
// let genbtn=document.querySelector(".btn");

// let colors=["red", "black", "blue", "green", "yellow", "grey", "pink", "orange", "purple", "white"]
// function RandomColor() {
//     let index = Math.floor(Math.random() * 10);
//     let color=colors[index];
//     return color
// }

// genbtn.addEventListenerListener("click", function() {

// let color=random.color()
// box.style.background=color;
// })

// const box = document.getElementById('colorBox');
// const generateBtn = document.getElementById('generateBtn');
// const stopBtn = document.getElementById('stopBtn');

// let intervalId = null;

// function getRandomColor() {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);
//     return `rgb(${r}, ${g}, ${b})`;
// }

// function changeColor() {
//     const newColor = getRandomColor();
//     box.style.backgroundColor = newColor;
//     box.textContent = newColor;
// }

// generateBtn.addEventListener('click', () => {
//     if (intervalId === null) {
//         changeColor(); // Immediately change once
//         intervalId = setInterval(changeColor, 2000); // then every 2 seconds
//     }
// });

// stopBtn.addEventListener('click', () => {
//     if (intervalId !== null) {
//         clearInterval(intervalId);
//         intervalId = null;
//     }
// });

// 1. create a new element using createElement function
// 2. Insert required data in that element either using innerHTML or innerText
// 3. Insert new Element in parent container using appendChild or append

let todos=[
    {
        id:234234,
        title:"study at 9pm"
} , {
        id:2345678,
        title:"play at 6pm"
}
]
let todo = {
    id: 234234,
    title: "study at 9pm"
}
let todocontainer = document.querySelector(".todocontainer");
function addTodo(todo) {
    let li = document.createElement("li");
    li.innerHTML=`<div><input type="checkbox" name="" id="">
                <h1>Todo-3</h1>
                <div>
                    <button>cross</button>
                    <button>-</button>
                </div>
            </div>`
}
addTodo(todo);