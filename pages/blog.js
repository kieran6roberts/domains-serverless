import Nav from "../src/components/Nav/Nav";
import Hero from "../src/components/Hero/Hero";
import Posts from "../src/components/Posts/Posts";

export default function Blog({ posts }) {
    return (
        <>
        <Nav />
        <div className="container px-4 py-8 text-white bg-pink-900 md:px-16 bg-opacity-80">
        <Hero />
        <Posts posts={posts} />
        </div>
        </>
    )
}

export async function getServerSideProps() {
    const posts = await fetch("http://localhost:3000/api/posts");
    const data = await posts.json();

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            posts: data
        }
    }
}
