import { PostList } from "../../components/post-list";
import { Spinner } from "../../components/spinner";
import { WelcomeCard } from "../../components/welcome-card";

export function HomePostsPage({ createPost, isLoading, posts, handlePostLike, currentUser, handleDeletePost  }) {
 
  return ( 
        
    <>
    <WelcomeCard createPost={createPost}/>
     {isLoading
       ? <Spinner/>
       : <PostList posts={posts} onPostLike={handlePostLike} currentUser={currentUser} handleDeletePost={handleDeletePost}/>}

    </>   
  );
};
