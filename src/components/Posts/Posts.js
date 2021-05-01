import uuid from "react-uuid";

const Posts = ({ posts }) => (
    <div className="grid grid-cols-1 md:grid-cols-3">
        {posts ? posts.map(({title, body}) => (
            <article className="border-2 border-gray-300" key={uuid()}>
                <h3>
                    {title}
                </h3>
                <p>
                    {body}
                </p>
            </article>
        )) : <p>No posts available</p>}
    </div>
)


export default Posts;