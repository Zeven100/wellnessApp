import { BlogCard } from "../components/blogcard";
import { Appbar } from "../components/appbar";
import { useBlogs } from "../hooks/index";
import { BlogSkeleton } from "../components/blogskeleton";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

   if(loading){
    return <div style={{width : '100vw' , height : '100vh'}}><BlogSkeleton/></div>
   }
    return (
        <div style={{background : 'linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(52,46,46,0.8493522408963585) 100%)', height : '100vh' , width : '100vw'}}>
            <Appbar />
            <div style={{background : 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.8493522408963585) 100%)'}}>
                {blogs && blogs.length > 0 ? (
                    blogs.map(blog => (
                        <BlogCard
                            id={blog.id}
                            key={blog.id} // Don't forget to add a unique key when mapping over elements
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            Date={blog.Date}
                            Month={blog.Month}
                            Year={blog.Year}
                        />
                    ))
                ) : (
                    <div>No blogs available</div>
                )}
            </div>
        </div>
    );
};
