
import * as fs from "fs";

enum Gender
{
   MALE='MALE',
   FEMALE='FEMALE',
}
interface User{
    name:string;
    age:number;
    email:string;
    Gender:Gender;
}


const FILE_PATH="./dist/userDetail.json";
const initialValue: User[]=[
    {
      name:"Jasleen",
      age:25,
      email:"abc@gmail.com",
      Gender:Gender.MALE,
    }
];

enum FILE_MODE{
    READ="r",
    WRITE="w",
    APPEND="a",
}
//To check if file exist

const checkFileExist=async(file: string):Promise<boolean>=>{
    try {
        await fs.promises.access(file,fs.constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}

//Function to add initial data if file does not exist

async function fillInitialDataIfFileNotExist():Promise<void>{
    fs.appendFile(FILE_PATH,JSON.stringify(initialValue),(err)=>{
        if(err){
            console.log("Error in creating file");
            return;
        }
        else{
            console.log("File and data inserted successfully");
            return;
        }
        
    })
}
// Function to add new user

async function createNewUser(newUser: User):Promise<void>{
    await fs.readFile(FILE_PATH,"utf-8",(err,data: string|Buffer)=>{
         if(err){
             console.log(err);
             return;
         }
        const parsedData=JSON.parse(data as string);
        const isEmailExist: boolean=parsedData.some((obj: any)=>{
          return obj.email===newUser.email;
        })
       
       if(isEmailExist){
         console.log(`User with this ${newUser.email} already exist`);
       }
       else{
         const appendedData: User[]=[...parsedData,newUser];
         fs.writeFile(FILE_PATH,JSON.stringify(appendedData),(err)=>{
          if(err)
          {
              console.log(err);
              return;
          }
          else{
              console.log("New user added successfully");
              return;
          }
         })
       }
     })
}

//Function to get all user details

async function getAllUserDetails():Promise<void>{
    await fs.readFile(FILE_PATH,"utf-8",(err,data:string|Buffer)=>{
        if(err){
            console.log(err);
            return;
        }
       const parsedData=JSON.parse(data as string);
      console.log(parsedData);
    });
    return;
}
//Function to get user detail by email

async function getUserDetailByEmail(email: string):Promise<void>{
    await fs.readFile(FILE_PATH,"utf-8",(err,data: string| Buffer)=>{
        if(err){
            console.log(err);
            return;
        }
       const parsedData=JSON.parse(data as string);
       const indexToBeSearched: number=parsedData.findIndex((obj: any)=>{
         return obj.email===email;
       })
       if(indexToBeSearched===-1)
       {
        console.log("email not exist");
       }
       else{
        console.log(parsedData[indexToBeSearched]);
       }       
    });
    return;
}
// Function to delete user by email

async function deleteUserByEmail(email: string)
{
    await fs.readFile(FILE_PATH,"utf-8",(err,data: string|Buffer)=>{
        if(err){
            console.log(err);
            return;
        }
       const parsedData=JSON.parse(data as string);
       const indexToBeSearched: number=parsedData.findIndex((obj: any)=>{
         return obj.email===email;
       })
       if(indexToBeSearched===-1)
       {
        console.log("email not exist");
       }
       else{ 
       console.log(parsedData.splice(indexToBeSearched,1));
       console.log(JSON.stringify(parsedData));
       fs.writeFile(FILE_PATH,JSON.stringify(parsedData),(err)=>{
        if(err)
        {
            console.log(err);
            return;
        }
        else{
            console.log("User deleted  successfully");
            return;
        }
    })
} 
    });
    return; 
}

