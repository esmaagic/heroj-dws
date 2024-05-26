'use client'

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Typography } from "@mui/material";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from './ForumCard.module.css'
import CommentCard from "../CommentCard";
import { format } from "date-fns";
import CommentForm from "../CommentForm";



interface CurrentUser {
  name: string,
  lastname: string,
  email: string,
  role_id: number,
  id: number,
}

interface CardInfo {
    user_name: string,
    user_last_name: string,
    post_title: string,
    post_content: string,
    likes: number,
    created_at: string,
    post_id: number,
    user_id: number,
    current_user: CurrentUser | null,
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const RotatingExpandMoreIcon = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const formatDate = (dateString: string | number | Date) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  
function ForumCard({user_name, user_last_name, post_title, post_content, likes, created_at, post_id, user_id, current_user} : CardInfo){
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likes_count, setLikes] = useState(likes)
    const [read_more, setReadMore] = useState(false);
    const [show_read_more, setShowReadMore] = useState(false);
    const [comments, setComment]: any = useState([]);
    const [reply, setReply] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);
  
    console.log("Svaki like stanje " , post_title, " ", liked);

    function getAllComments(post_id: number) {
      axios.get(`http://localhost:8000/comments/${post_id}`).then((response) => {
          setComment(response.data); 
          console.log(response.data);
      }, (error) => {
          console.log("Error: ", error);
      });
  
}

        useEffect(() => {
          getAllComments(post_id);
        }, []);

    function isItAlreadyLiked(current_userID: number, post_id: number) {
        axios.get(`http://localhost:8000/posts/like/${current_userID}/${post_id}/`).then((response) => {
          if(response.data)
            setLiked(true)
          else setLiked(false)
          console.log(liked, 'poruka')
        }, (error) => {
          console.log("Error", error)
        })
    }

    //increasing a like for a post
    const increaseLike = async (postId: number , userId: number | undefined | null) => {
      try {
        const response = await axios.put("http://localhost:8000/posts/likes/increase", { user_id: userId, post_id: postId });
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error increasing like:', error);
      }
    };

    //decrease a like for a post
    const decreaseLike = async (postId: number, userId: number | undefined | null) => {
      try {
        const response = await axios.put(`http://localhost:8000/posts/likes/decrease/`, {user_id: userId , post_id: postId });
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error decreasing like:', error);
      }
    };

    const newLike = async (postId: number, userId: number | null | undefined) => {
      try {
        const response = await axios.post("http://localhost:8000/posts/like/", {user_id : userId, post_id: postId});
        console.log('Response: ', response.data);
      } catch(error) {
        console.error('Error documenting a like: ', error);
      }
    };

    const deleteLike = async (postId: number, userId: number | null | undefined) => {
      try {
        const response = await axios.delete(`http://localhost:8000/posts/like/${postId}/${userId}/`);
        console.log('Response: ', response.data);
      } catch(error) {
        console.error('Error deleting a like: ', error);
      }
    };

    const handleExpandClick = () => {
      setExpanded(!expanded);
    }

    const handleReadMore = () => {
      setReadMore(!read_more);
    }

    const handleReply = () => {
      setReply(!reply)
    }
    
    const handleLikesClick = () => {
        console.log(liked)
        if (!liked) {
          console.log("hoces da like-as")
          increaseLike(post_id, current_user?.id)
          console.log("povecao se like za 1 u bazi")
          console.log("sad ce se stvoriti u post_likes novi red")
          newLike(post_id, current_user?.id)
          setLikes(likes_count + 1)
          console.log("stvorio se novi red")
        }
        else {
          decreaseLike(post_id, current_user?.id)
          deleteLike(post_id, current_user?.id)
          setLikes(likes_count - 1)
        }
        setLiked(!liked)

    }

    useEffect(() => {
      if(current_user)
        isItAlreadyLiked(current_user.id ,post_id)
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
    }, [post_content])

    return(
        <Card sx={{ width: "100%" , mt: 1}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
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
        <Typography variant="h5" sx={{mb: 2}} className={styles.title}>
            {post_title}
        </Typography>
        <Typography ref={contentRef} variant="subtitle1" color="text.secondary" className={`${styles.content} ${read_more ? styles.expanded : 'collapsed'}`}>
          {post_content}
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
        <Button onClick={handleReply} sx={{m: 1}} >
          {reply ? 'Cancel' : 'Reply'}
          </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded} 
          aria-label="show more"
          sx={{"&:hover": {
                backgroundColor: 'transparent'
              }}}
          >
          <RotatingExpandMoreIcon expand = {expanded} sx={{"&:hover": {
                backgroundColor: 'transparent'
              }}}>
            <ExpandMoreIcon />
          </RotatingExpandMoreIcon>
          <Typography>Comments</Typography>
        </ExpandMore>  
      </CardActions>
      {reply && current_user && (
            <><CommentForm user_id={current_user?.id} post_id={post_id} getAllComments = {getAllComments}></CommentForm>

            </>
          )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {comments.map((comment: any) => ( 
                <CommentCard 
            key={comment.id}
            user_name={comment.users.name}
            user_last_name={comment.users.lastname}
            comment_content={comment.comment}
            likes={comment.likes}
            created_at={formatDate(comment.created_at)}
            post_id={comment.post_id}
            user_id={comment.user_id}
            current_user={current_user} comment_id={comment.id}></CommentCard>
            )

        )}
        </CardContent>
      </Collapse>
    </Card>
    );
}

export default ForumCard
