import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { addPost, fetchPosts, fetchTags } from '../api/api';

const PostList = () => {
    const { data: postData, isError, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    const { data: tagsData } = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
    })

    // Add a check for postData being undefined
    if (isLoading) {
        return <p>Loading....</p>;
    }

    if (isError) {
        return <p>{error?.message}</p>;
    }

    // If postData is still undefined, return null or some default component
    if (!postData) {
        return null; // or return <p>No posts found</p>;
    }

    const { mutate, isError: isPostError, isPending, error: postError, reset } = useMutation({
        mutationFn: addPost,
    })

    return (
        <div className='container'>
            <form>
                <input
                    type="text"
                    placeholder='Enter your post..'
                    className='postbox'
                    name='title'
                />
                <div className="tags">
                    {tagsData ? tagsData.map((tag) => {
                        return (
                            <div key={tag}>
                                <input name={tag} id={tag} type="checkbox" />
                                <label htmlFor={tag}>{tag}</label>
                            </div>
                        );
                    }) : null}
                </div>
                <button>Post</button>

            </form>
            {postData?.map((post) => {
                return (
                    <div key={post.id} className='post'>
                        <div>{post.title}</div>
                        {post.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default PostList;
