// let Data;
// function getUsersData(URL) {
//     fetch(URL)
//     .then((res) => {
//         console.log(res);
//         return res.json();
//     })
//     .then((data) => {
//         Data = data;
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// }
// getUsersData('https;//jsonplaceholder.typicode.com/users')

let Data;
function getUsersData(URL) {
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            Data = data;
            let username = document.querySelector(".name");
            for (let i = 0; i < Data.length; i++) {
                let li = document.createElement('li');
                li.innerHTML = `
                    <div>${Data[i].username}</div>
                `;
                username.appendChild(li);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
getUsersData('http://localhost:3000/users');