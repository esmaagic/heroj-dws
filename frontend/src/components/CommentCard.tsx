'use client'

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from './ForumCard/ForumCard.module.css'

interface CurrentUser {
  name: string,
  lastname: string,
  email: string,
  role_id: number,
  id: number,
}

interface CardInfo {
    comment_id: number,
    user_name: string,
    user_last_name: string,
    comment_content: string,
    likes: number,
    created_at: string,
    post_id: number,
    user_id: number,
    current_user: CurrentUser | null,
}
 
function CommentCard({user_name, user_last_name, comment_content, likes, created_at, post_id, user_id, comment_id, current_user} : CardInfo){
    const [liked, setLiked] = useState(false);
    const [likes_count, setLikes] = useState(likes)
    const [read_more, setReadMore] = useState(false);
    const [show_read_more, setShowReadMore] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);
    
    console.log("Svaki like stanje " , comment_content, " ", liked);

    function isItAlreadyLiked(current_userID: number, comment_id: number) {
        axios.get(`http://localhost:8000/comments/${current_userID}/${comment_id}/`).then((response) => {
          if(response.data)
            setLiked(true)
          else setLiked(false)
          console.log(liked, 'poruka')
        }, (error) => {
          console.log("Error", error)
        })
    }

    //increasing a like for a comment
    const increaseLike = async (commentId: number , userId: number | undefined | null) => {
      try {
        const response = await axios.put("http://localhost:8000/comments/likes/increase/", { user_id: userId, post_id: commentId });
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error increasing like:', error);
      }
    };

    //decrease a like for a comment
    const decreaseLike = async (commentId: number, userId: number | undefined | null) => {
      try {
        const response = await axios.put(`http://localhost:8000/comments/likes/decrease/`, {user_id: userId , post_id: commentId });
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error decreasing like:', error);
      }
    };

    const newLike = async (commentId: number, userId: number | null | undefined) => {
      try {
        const response = await axios.post("http://localhost:8000/comments/like/", {user_id : userId, post_id: commentId});
        console.log('Response: ', response.data);
      } catch(error) {
        console.error('Error documenting a like: ', error);
      }
    };

    const deleteLike = async (commentId: number, userId: number | null | undefined) => {
      try {
        const response = await axios.delete(`http://localhost:8000/comments/like/${commentId}/${userId}/`);
        console.log('Response: ', response.data);
      } catch(error) {
        console.error('Error deleting a like: ', error);
      }
    };

    const handleReadMore = () => {
      setReadMore(!read_more);
    }
    
    const handleLikesClick = () => {
        console.log(liked)
        if (!liked) {
          console.log("hoces da like-as")
          increaseLike(comment_id, current_user?.id)
          console.log("povecao se like za 1 u bazi")
          console.log("sad ce se stvoriti u post_likes novi red")
          newLike(comment_id, current_user?.id)
          setLikes(likes_count + 1)
          console.log("stvorio se novi red")
        }
        else {
          decreaseLike(comment_id, current_user?.id)
          deleteLike(comment_id, current_user?.id)
          setLikes(likes_count - 1)
        }
        setLiked(!liked)

    }

    useEffect(() => {
      if(current_user)
        isItAlreadyLiked(current_user.id ,comment_id)
    }, [])

    useEffect(() => {
      function handleResize() {
        if (contentRef.current) {
          const maxHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight) * 5;
          if (contentRef.current.scrollHeight > maxHeight) {
            setShowReadMore(true);
          } else {
            setShowReadMore(false);
          }
        }
      }
  
      handleResize(); // Pokretanje funkcije prilikom prvog renderovanja
  
      window.addEventListener('resize', handleResize); // Dodavanje event listenera za promjenu veličine ekrana
  
      return () => {
        window.removeEventListener('resize', handleResize); // Uklanjanje event listenera prilikom unmount-a komponente
      };
    }, [comment_content])

    return(
        <Card sx={{ width: "100%" , mt: 1}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }} aria-label="recipe">
            {user_name.charAt(0)}
          </Avatar>
        }
        title= {`${user_name} ${user_last_name}`}
        subheader= {created_at}
        sx={{ 
          "& .MuiCardHeader-title": {
            fontSize: "1.2rem", 
          }}}
      />
      <CardContent>
        <Typography ref={contentRef} variant="subtitle1" color="text.secondary" className={`${styles.content} ${read_more ? styles.expanded : 'collapsed'}`}>
          {comment_content}
        </Typography>
        {show_read_more && (
        <Button onClick={handleReadMore} className={styles.readMoreButton}>
            {read_more ? 'Read less': 'Read more'}
          </Button>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLikesClick}>
          {liked ? <FavoriteIcon color="primary"/> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
        <Typography>{likes_count}</Typography>  
        </CardActions>
    </Card>
    );
}

export default CommentCard
