import { Hono } from 'hono' ;
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';
import { verify } from 'hono/jwt' ;
import { createBlogInput , updateBlogInput } from '@satvik-jain/medium-common';
import { date } from 'zod';

export const blogRouter = new Hono<{
    Bindings :{
        DATABASE_URL :string ;
        JWT_SECRET :string ;
    },
    Variables : {
        authorId : number ;
    }
}>() ;
blogRouter.use("/*" , async (c, next)=>{
    //extract the userId 
    const authHeader = c.req.header("authorization") || "" ;
    const author = await verify(authHeader , c.env.JWT_SECRET);
    
    if(author){
        //pass it down to the route handler
        c.set("authorId" , author.id) ; 
        await next() ;
    }
    else{
        c.status(403) ;
        return c.json({
            message : "You are not logged in ."
        })
    }

})
blogRouter.post("/" , async(c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate()) ;
    const body = await c.req.json() ;
    const {success} = createBlogInput.safeParse(body) ;
    if(!success){
        c.status(411) ;
        return c.json({
            message : "Wrong Inputs"
        })
    } 
    try
    {
        const currentDate = new Date(); // Corrected the initialization of Date object
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get('authorId'),
                Date: currentDate.getDate(),
                Month: currentDate.getMonth() + 1 ,
                Year: currentDate.getFullYear()
            }
        });
    return c.json({
        id : blog.id
    })
    }
    catch(error){
        c.status(403);
        console.error(error) ;
        return c.json({
            error : "Error while posting the blog"
        })
    }
})
blogRouter.put("/" , async(c)=>{
    const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json() ;
    const {success} = updateBlogInput.safeParse(body) ;
    if(!success){
        c.status(411) ;
        return c.json({
            message : "Wrong Inputs"
        })
    } 
    try{
        const blog = await prisma.blog.update({
            where :  {
                id : body.id
            },
            data : {
                title : body.title ,
                content  : body.content
            }
        })
        return c.json({
           id : blog.id 
        })

    }
    catch(e){
        c.status(411);
        return c.json({
            e : "Error updating the blog "
        })
    }
 })
 blogRouter.delete("/:id" ,async(c)=>{
    try {
        const prisma = new PrismaClient({
            datasourceUrl : c.env.DATABASE_URL
        }).$extends(withAccelerate());
        
        const id : number = Number(c.req.param("id")) ;
        const authorId : number= Number(c.get('authorId'));

        if(authorId === 5){
            const res = await prisma.blog.findFirst({
                where : {
                    id : id
                },
                select:{
                    authorId : true
                }
            })
    
            if(res){
                const res2 = await prisma.blog.delete({
                    where : {
                        id : id
                    },
                    select : {
                        title :true
                    }
                })
                if(res2){
                    return c.text(`blog with id : ${id} deleted`)
                }
            } else {
                throw new Error("No such article exists .");
            }
        }
else{
    const res = await prisma.blog.findFirst({
        where : {
            id : id
        },
        select:{
            authorId : true
        }
    })

    if(res && res.authorId === authorId){
        const res2 = await prisma.blog.delete({
            where : {
                id : id
            }
        })
        if(res2){
            
           return c.text(`blog with id : ${id} deleted`)
        }
    } else {
        throw new Error("Unauthorized deletion attempt.");
    }
}
     
    } catch (error) {
        console.error("Error occurred:", error);
        // Handle error response
        c.status(500);
        c.text("Internal server error");
    }
})

 blogRouter.get("/bulk",async (c)=>{
    const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    // Todo : add pagination 
    const blogs = await prisma.blog.findMany({
        select : {
            content : true ,
            title : true ,
            id : true ,
            author : {
                select : {
                    name : true
                }
            },
            Date : true ,
            Month : true ,
            Year :true 
        }
    })
    
    return c.json({
        blogs
    })

 })

 blogRouter.get("/bulk/:id",async (c)=>{
    
    const id = c.req.param("id") ;
    
    const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())
    // Todo : add pagination 
    const blog = await prisma.blog.findFirst({
        where : {
            id : Number(id)
        },
        select : {
            id : true,
            title : true ,
            content : true ,
            author : {
                select : {
                    name : true
                }
            } ,
            Date : true ,
            Month : true ,
            Year :true 

        }
    })
    return c.json({
        blog
    })

 })