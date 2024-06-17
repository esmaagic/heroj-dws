import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Box, Typography,Dialog ,DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import  { useRouter } from 'next/navigation';
import { Post, Media, Section } from './ContentCard';
import { useRef, useState } from 'react';

type FormValues = {
  title?: string;
  paragraph?: string;
};

interface ContentFormProps {
    content_id: number;
}

const ContentForm: React.FC<ContentFormProps> = ({ content_id  }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
    
      const response = await axios.post(`http://localhost:8000/contents/section/`, {content_id, ...data});
      const newSection = response.data;
      const section_id = newSection.id
      const name = "none"
      if (file) {
        const formData = new FormData();
        formData.append('file', file);  
        /* const response = await axios.post('http://localhost:8000/contents/media/', ); */
        await fetch(`http://localhost:8000/contents/media/${section_id}/`, {
          method: "POST",
          body: formData
        })
      
      }
      
      
 

    } catch (error) {
    }
  };
  

  

  return (
<>
    <Button onClick={handleClickOpen} variant="outlined">Dodaj sekciju</Button>

    


    <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Kreiraj sekciju</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Kreirajte sekciju. Dodana datoteka bice prikazana nakon teksta!
          </DialogContentText>
            
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }} >


      <TextField
        label="Naslov"
        fullWidth
        variant="outlined"
        {...register('title', { required: true })}
        error={!!errors.title}
        sx={{ mb: 2 }}
      />

    <TextField
        label="Tekst"
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        {...register('paragraph', { required: true })}
        error={!!errors.title}
        sx={{ mb: 2 }}
      />

    
      




      <Button type="submit" variant="contained" color="primary">
       Kreiraj sekciju
      </Button>
      <Box sx={{marginY:2}}>
      <input type="file" onChange={handleFileChange} />
      </Box>
      

    </Box>




        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContentForm;


