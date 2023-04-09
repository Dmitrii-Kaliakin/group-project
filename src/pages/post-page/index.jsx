import { useEffect, useState } from 'react';
import { postApi } from '../../api/posts';
import { userApi } from '../../api/user';
import { CardPost } from '../../components/card-post';
import { Spinner } from '../../components/spinner';
import { useParams } from 'react-router-dom';

export function PostPage() {
    const { productID } = useParams()
    console.log(productID)
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);
    
      
    useEffect(() => {
        setIsLoading(true);
        Promise.all([postApi.getById(productID), userApi.getCurrentUserInfo()])
            .then(([postData, userData]) => {
                setCurrentUser(userData);
                setPost(postData);
                console.log(postData)
            })
            .catch((err) => {
                setErrorState(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])
    
    return (
    <>
        {isLoading ? <Spinner/> : <CardPost post={post} currentUser={currentUser} />}
    </>
    );
};
  