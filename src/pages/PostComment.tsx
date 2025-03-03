import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { usePostFavPage } from '../stores/favorite'
import { Button } from "react-bootstrap";
interface CommentProps {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}


const Card = styled.div`
  width: 650px;
  background: linear-gradient(135deg, #74a48b, #ede7e7);
  border-radius: 20px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  margin-block: 15px;
  color: #3d3b3a;
  margin-inline: 15px;

  &:hover {
    transform: scale(1.05);
  }
`;
const Title = styled.h2`
  text-align: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export async function postLoader({ params }: { params: { userId: string } }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.userId}/comments`
  );
  const comment = await response.json();
  console.log("Fetched user:", comment);

  return comment;
}

export const PostComment = () => {
  const comment = useLoaderData() as CommentProps[];

 
  const favComment = usePostFavPage((state)=>state.CommentProps);
  const removeFavComment = usePostFavPage ((state)=> state.removeFavComment);
  const addFavoriteComments= usePostFavPage ((state)=> state.addFavoriteComments);
  
  


  return (
    <>
      <Title>PostComments</Title>
      <Container>
        {comment.map((comment) => (
          <Card key={comment.id} >
            <div> {comment.postId} </div>
            <div> {comment.name} </div>
            <div> {comment.email} </div>
            <div> {comment.body} </div>
            <Button> 
              

            </Button>
          </Card>
        ))}
      </Container>
    </>
  );
};
