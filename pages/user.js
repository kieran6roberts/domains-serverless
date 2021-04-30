import React, { useEffect, useState } from "react";
import Nav from "../src/components/Nav/Nav";
import Hero from "../src/components/Hero/Hero";
import Posts from "../src/components/Posts/Posts";

export default function User({ postsData }) {
    return (
        <>
        <Nav />
        <div className="container px-4 md:px-16 py-8 bg-pink-900 bg-opacity-80 text-white">
        <Hero />
        <Posts posts={postsData} />
        </div>
        </>
    )
}

export async function getServerSideProps() {
    const postsResponse = await fetch("http://localhost:3000/posts.json");
    const postsData = await postsResponse.json();

    if (!postsData) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            posts: postsData
        }
    }
}
