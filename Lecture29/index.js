// const { PrismaClient } = require('./generated/prisma');
// const prisma = new PrismaClient()
// async function addUser(email, name, password) {
//     await prisma.user.create({
//         data: {
//             email: email,
//             name: name,
//             password: password 
//         }
//     })
// }
//addUser("user4@gmail.com", "user4", "user4").then(() => {
    // console.log(("User added successfully"));
// })

// async fucntion getAllUsers() {
    // let allUsers = await prisma.user.findMany();
    // return allUsers;
// }
// getAllUsers().then((data) => {
    // console.log(data);
// })

// async functon getUserById(id) {
    // const userById = await prisma.user.findUnique({
        // where:{
            // id: id
        // }
    // })
    // return userById;
// }
// getUserById(2).then((data) => {
    // console.log(data);
// })

// async function updateUser(email, data) {
    // const updateUser = await prisma.user.update({
        // where: {
            // email: email,
        // },
        // data: data
    // })
    // return updateUser;
// }
// updateUser("user2@gmail.com",
// {
    // name: "user22",
    // password: "user22"
// })
// .then((data) => {
    // console.log(data);
// })
// .catch((error) => {
    // console.log(error);
// })



// let {PrismaClient}=require("./generated/prisma");
// let prisma=new PrismaClient();
// async function addUser(name,email,password){
//     let newUser=await prisma.user.create({
//         data:{
//             name:name,
//             email:email,
//             password:password
//         }
//     })
//     return newUser;
// }

// // addUser("Saloni","Saloni@gmail.com","1234").then((data)=>{
// //     console.log("User created successfully");
// // }).catch((err)=>{
// //     console.log("Error");
// // })

// async function addTweeet(content,userId){
//     const newTweet=await prisma.tweet.create({
//         data:{
//             content:content,
//             userId:userId
//         }
//     })
//     return newTweet;
// }
// // addTweeet("This is my first tweet",1).then((data)=>{
// //     console.log("Tweet add successfully");
// // }).catch((error)=>{
// //     console.log("Error");
// // })

// //find all tweet whose userId is 1
// async function getOneTweet(userId){
//     const oneTweet=await prisma.tweet.findMany({
//         where:{
//             userId:Number(userId)
//         }
//     })
//     return oneTweet;
// }
// getOneTweet(1).then((data)=>{
//     console.log("Tweet",data);
// }).catch((error)=>{
//     console.log("Error");
// })

// //user who's id is one wants to update his tweet=> tweet id is 1
// async function updateTweet(tweetid,userId,updatedContent){
//     let tweet=await prisma.tweet.findUnique({
//         where:{
//             id:Number(tweetid)
//         }
//     })
//     if(!tweet){
//         return "Tweet not exists"
//     }
//     if(tweet.userId!=Number(userId)){
//         return "User cannot update this tweet";
//     }
//     const updatedTweet=await prisma.tweet.update({
//         where:{
//             id:Number(tweetid)
//         },
//         data:{
//             content:updatedContent
//         }
//     })
// }
// // updateTweet("1","1","updated Tweet").then((data)=>{
// //     console.log("Successfully");
// // }).catch((error)=>{
// //     console.log("Error");
// // })

// async function deletedTweet(tweetid,userId){
//     let tweet=await prisma.tweet.findUnique({
//         where:{
//             id:Number(tweetid)
//         }
//     })
//     if(!tweet){
//         return "Tweet not exists"
//     }
//     if(tweet.userId!=Number(userId)){
//         return "User cannot delete this tweet";
//     }
//     const deleteTweet=await prisma.tweet.delete({
//         where:{
//             id:Number(tweetid)
//         }
//     })
// }
// deletedTweet("2","1").then((data)=>{
//     console.log("Deleted successfully");
// }).catch((error)=>{
//     console.log("error");
// })

// create a function to delete user by Id;

const express=require("express");
const {PrismaClient}=require("./generated/prisma");
const app=express();
const prisma=new PrismaClient();

app.use(express.json());

//CREATE USER
app.post("/tweet/addUser",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const newUser=await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:password
            }
        });
        res.json({
            success:true,
            message:"User added successfully",
            data:newUser
        });
    }catch(error){
        res.json({
            success:false,
            message:error.message
        });
    }
});

//GET ALL USERS
app.get("/tweet/allUsers",async(req,res)=>{
    try{
    const users=await prisma.user.findMany({
        include:{
            tweet:true
        }
    });
    res.json({
        success:true,
        message:"User fetched successfully",
        data:users
    });
} catch(error){
    res.json({
        success:false,
        message:error.message
    })
}

})

//USER BY ID
app.get("/tweet/user/:id",async(req,res)=>{
    const {id}=req.params;
    const userExist=await prisma.user.findUnique({
        where:{
            id:Number(id)
        },
        include:{
            tweet:true
        }
    });
    if(!userExist){
        res.json({
            success:false,
            message:"User not found"
        })
    }

    return res.json({
        success:true,
        message:"User found successfully",
        data:userExist
    });
})

//UPDATE USER
app.put("/tweet/users/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,email,password}=req.body;
       const userExist=await prisma.user.findUnique({
        where:{
            id:Number(id)
        }
       })
       if(!userExist){
        return res.json({
            success:false,
            message:"User not found"
        })
       }

       const updatedUser=await prisma.user.update({
        where:{
            id:Number(id)
        },
        data:{
            name:name,
            email:email,
            password:password
        }
       })
       return res.json({
        success:true,
        message:"User updated successfully",
        data:updatedUser
       })

    }catch(error){
        res.json({
            success:false,
            message:error.message
        });
    }
})

//DELETE USER
app.delete("/tweet/users/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const userExist=await prisma.user.findUnique({
            where:{
                id:id
            }
        })

        if(!userExist){
            return res.json({
                success:false,
                message:"User not found"
            })
        }

        const deletedUser= await prisma.user.delete({
            where:{
                id:Number(id)
            }
        })
        return res.json({
            success: true, 
            message: "User deleted successfully!" ,
            data:deletedUser
        });
    } catch (error) {
        res.json({ 
            success: false,
            message:error.message
         });
    }
})

//CREATE TWEET
app.post("/tweet/addTweet",async(req,res)=>{
    try{
        const {content,userId}=req.body;
        const userExist=await prisma.user.findUnique({ 
            where:{ 
                id: Number(userId) 
            }
        });
        if(!userExist){ 
            return res.json({
                success: false, 
                message: "User not found" 
            });
        }
        const newTweet=await prisma.tweet.create({
            data:{
                content:content,
                userId:Number(userId)
            }
        });
        res.json({
            success:true,
            message:"Tweet created successfully",
            data:newTweet
        });
    }catch(error){
        res.json({
            success:false,
            message:error.message
        });
    }
})


//GET TWEET BY ID
app.get("/tweet/getTweet/:tweetId", async (req, res) => {
  try {
    const {tweetId} = req.params;
    const tweetExist = await prisma.tweet.findUnique({
      where: { id: Number(tweetId) },
      include: { user: true }
    });

    if (!tweetExist) {
      return res.json({
        success: false,
        message: "Tweet not found"
      });
    }

    return res.json({
      success: true,
      message: "Tweet fetched successfully",
      data: oneTweet
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message
    });
  }
});

//UPDATE TWEET
app.put("/tweet/updateTweet/:tweetId", async (req, res) => {
    try{
        const { tweetId } = req.params;
        const { userId, content } = req.body;

        const tweet = await prisma.tweet.findUnique({ 
            where: {
                id: Number(tweetId) 
            }
        });
        if (!tweet) {   
            return res.json({ 
                success: false, 
                message: "Tweet not exists" 
            });
        }

        if (tweet.userId !== Number(userId)) {
            return res.json({   
                success: false,     
                message: "You are not authorized to update this tweet" });
        }

        const updatedTweet = await prisma.tweet.update({
            where: {
                id: Number(tweetId)
            },
            data:{content}
        });
        return res.json({  
            success: true, 
            message: "Tweet updated successfully",
            data: updatedTweet
         });
    }catch(error){
        res.json({
            success:false,
            message:error.message
        })
    }
});

//DELETE TWEET
app.delete("/tweets/:tweetId", async (req, res) => {
    try{
        const { tweetId } = req.params;
        const { userId } = req.body;

        const tweet = await prisma.tweet.findUnique({ 
            where: {
                id: Number(tweetId) 
            }
        });
        if (!tweet) {
            return res.json({ 
                success: false,
                message: "Tweet not exists" 
            });
        }

        if (tweet.userId !== Number(userId)) {
            return res.json({   
                success: false, 
                message: "You are not authorized to delete this tweet" 
            });
        }

        await prisma.tweet.delete({ 
            where: {    
                id: Number(tweetId) 
            }
        });
        res.json({ 
            success: true, 
            message: "Tweet deleted successfully!",
        });
    }catch(error){
        res.json({
            success:false,
            message:error.message
        })
    };
});

app.listen(3056,()=>{
    console.log("Server started");
})


//create a function to delete user by Id.

// async function deleteUser(userId) {
//     try {
//         const deletedUser = await prisma.user.delete({
//             where: {
//                 id: userId
//             }
//         })
//     }
// }

// async function deleteUser(userId) {
//     await prisma.user.delete({
//         where: {
//             id: Number(userId)
//         }
//     })
//     return "User deleted"
// }
// deleteUser("1").
// then((data) => {
//     console.log(data)
// })
// .catch(err => console.log(err))

