import { Hono } from 'hono' ;
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';
import {sign} from 'hono/jwt' ;
import {signinInput} from '@satvik-jain/medium-common' ;
import {signupInput} from '@satvik-jain/medium-common' ;

export const userRouter = new Hono<{
    Bindings :{
        DATABASE_URL :string ;
        JWT_SECRET :string ;
    }
}>() ;

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json() ;
    
    const {success} = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message : "Wrong Inputs"
      })
    }
    

    try
    {
      console.log(body);
      const user = await prisma.user.create({
      data : {
        email : body.email ,
        password : body.password ,
        name : body.name
      },
      select : {
        name : true , 
        email : true,
        id : true
      }
    })
    
    const jwt = await sign({id : user.id} , c.env.JWT_SECRET) ;
    
    return c.json({
      jwt
    })
    }
    catch(error){
      c.status(403) ;
      return c.json({
        error : "Error signing up!"
      })
    }
  })
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json() ;
    const { success } = signinInput.safeParse(body) ;
    if(!success){
      c.status(411) ;
      return c.json({
        message : "Wrong Inputs" 
      })
     }
    try
    {
      const user = await prisma.user.findUnique({
      where : {
        email : body.email ,
        password : body.password 
      }
    })
    if(!user){
      c.status(403) ;
      return c.json({
        error : "User not found"
      })
  
    }
  
    const jwt = await sign({id : user.id} , c.env.JWT_SECRET) ;
    return c.json({
      jwt
    })
    }
    catch(error){
      c.status(403) ;
      return c.json({
        error : "Error signing up!"
      })
    }
    
  
  })
  userRouter.delete("/" , async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate()) ;
    const body = await  c.req.json() ;
    try{
      
        const deleted = await prisma.user.delete({
            where : {
                email : body.email ,
                password : body.password
            }
        })  
        console.log(deleted) ;
    } 
    catch(e){
        c.status(400) ;
        return c.json({
            e : "Error deleting the user "
        })
    }
  })
