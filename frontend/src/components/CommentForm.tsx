

import { Button } from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form"
import { text } from "stream/consumers";



interface ReplyFormInputs {
    comment: string;
  }

interface PostInfo {
    post_id: number,
    user_id: number,
    getAllComments: any
}
    


export default function CommentForm({post_id, user_id, getAllComments}: PostInfo) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm<ReplyFormInputs>()


  const onSubmit: SubmitHandler<ReplyFormInputs> = async (data) => {
    try {
        const response = await axios.post("http://localhost:8000/comments/", {comment: data.comment, user_id: user_id, post_id: post_id})
        console.log(response.data)
        reset()
        getAllComments(post_id)
        
    }
    catch(error){
        setError("root", {
            message: "Form not submitted"
        })
    }
  }


  console.log(watch("comment")) // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
      {/* register your input into the hook by invoking the "register" function */}
      <textarea {...register("comment", {required: true})}
        placeholder="Add a reply..."
        rows={1} // Define number of visible text lines
        cols={50} // Define width of the textarea in characters 
        style={{ 
            minHeight: '3em', 
            resize: 'none', 
            overflowY: 'hidden', 
            margin: '10px',
            border: '1px solid black',
            borderRadius: '5px',
            padding: '10px'
         }}
      />
      {/* errors will return when field validation fails  */}
      {errors.comment && <span>This field is required</span>}

      <Button variant= "outlined" type="submit" 
        sx={{
            bgcolor: "primary.main", 
            color: "white", 
            alignSelf: 'flex-end',
            m: 1,
            "&:hover": {
                color: 'primary.main'
              }
        }}
        >Reply</Button>
    </form>
  )
}