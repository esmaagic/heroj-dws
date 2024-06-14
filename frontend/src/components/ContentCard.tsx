// components/ContentList.tsx
import { Box, Card,CardContent, Avatar, CardMedia,Typography } from '@mui/material';

export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Post {
    id: number;
    title: string;
    user: User;
    created_at: string;
    media_url: string;
  }
  
interface Props {
  content: Post;
}

const ContentCard: React.FC<Props> = ({ content }) => {
  return (
          <>
   
          <Card sx={{  
            border: "none", borderRadius:"none", boxShadow: "none" , borderTop:"1px solid #bcbcbc",
            display: 'flex', 
            justifyContent:"space-between", 
            maxWidth:"630px", 
            marginX:"auto", 
            marginY: "15px"}}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Box sx={{ display: 'flex',alignItems:"center", marginBottom:1 }}>
                    <Avatar sx={{ width: 24, height: 24, marginRight:1 }}/>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                    {content.user.name}
                </Typography>
                </Box>
      
              <Typography
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                fontWeight: 'bold'
            }}
              component="div" variant="h5">
                {content.title}
              </Typography>
              
            </CardContent>
            <Typography sx={{ fontSize: 12, color: 'text.secondary', pl: 1, pb: 1 }}>
              Views: 123
            </Typography>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151, padding: 2 }}
            image={content.media_url}
            alt="Live from space album cover"
          />
        </Card>

          
          </>






  );
}

export default ContentCard;
