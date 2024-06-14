'use client'
import Button  from '../../components/MyButton';
import MapContainer from '@/components/Map';
import { useEffect, useState } from 'react';
import { Container, Typography, Link } from '@mui/material';
import ContentCard from '@/components/ContentCard';
import axios from 'axios';
import { Post } from '@/components/ContentCard';


const HomePage = () => {
  const [contents, setContents] = useState<Post[]>([]);

  useEffect(() => {
      async function fetchData() {
          const response = await axios.get<Post[]>('http://localhost:8000/contents');
          setContents(response.data);
          console.log(response.data);
      }
      fetchData();
  }, []);

  return (
      <div>
          <Container>
              {contents.map(content => (
                  <Link key={content.id} href={`/home/${content.id}`}  underline="none">
                    <ContentCard content={content} />
                  </Link>
              ))}
          </Container>
      </div>
  );
}

export default HomePage