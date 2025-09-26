// DOM full form = Document Object Model
// document API = windw object
// document Api helps creating the DOM TREE of the HTML/XML syntax

// accessing the dom element
//1. using id
//2. using class
//3. using tag
//4. querySelector

// let el1 = document.getElementById("heading");
// console.log(el1);
// let el2 = document.getElementsByClassName("item")
// console.log(el2[0]);
// let el3 = document.getElementsByTagName("p");
// console.log(el3[0]);
let el4 = document.querySelector("p");
console.log(el4);

console.log(el5);
let el6 = document.querySelectorAll(".item");
console.log(el6);
let ul=document.querySelector("#container");

// properties
/*
innerText
innerHtml
textContent
*/
// let data=el4.innerText;
// console.log(data);
// el4.innerText="change using js"
// let data2=ul.innerHTML;
// let data3=ul.innerText;
// let data4=ul.textContent;
// console.log(data2);
// console.log(data3);
// console.log(data4);

// ul.innerHTML='<li class="item">item 1</li>
//             <li class="item">item 2</li>
//             <li class="item">item 3</li>'

/*
getAttribute
setAttribute
classList
*/

let el5 = document.querySelector(".item");
console.dir(el5);
// console.dir(el5.getAttribute("id"));
// console.log(el5.getAttribute("class"));
// el5.setAttribute("id", "js");
// console.log(el5.getAttribute("id"));
el5.classList.add("delete");
console.log(el5.classList.contains("eqoufboeufb"));
el5.classList.remove("item");
console.log(el5.classList);