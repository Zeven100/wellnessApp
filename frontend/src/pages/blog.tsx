import { useParams } from "react-router-dom";
import { FullBlog } from "../components/fullblog";
import { useBlog } from "../hooks/index";
import { Appbar } from "../components/appbar";
export const Blog = () => {
    const { id } = useParams();
    const { blog, loading } = useBlog({ id: Number(id) || 1 });

    if (loading) {
        return <div>loading...</div>;
    }

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div>
            <Appbar/>
            <FullBlog blog={blog} />
        </div>
    );
};
