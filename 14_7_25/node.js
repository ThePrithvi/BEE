let user = [
    {
        id : 1, 
        name : "Nitish",
        age : 24
    },
    {
        id : 2,
        name : "Ritik",
        age : 16
    }
]

function isAllowed(id){
    new Promise((resolve,reject)=>{
        let user = users.filter((u)=>{
        return u.id == id
        })[0]
    })[0]
    console.log(user);
    if(!user) return console.log("No user found")
        if(user.age<18) return console.log("Not eligible to vote")
}

isAllowed(1).then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.log(err);
})
console.log("start");
console.log("sum 2 numbers");
// console.log(isAllowed(1));
// console.log(isAllowed(2));