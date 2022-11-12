
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
