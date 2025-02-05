import React from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";


 const Photo = styled.div `
  text-align: center;
  margin-inline: 30px;
  background: linear-gradient(134deg, #33adc5c0, #9448BC);
  border-radius: 20px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  margin-block: 10px;
  color: #212120;
  
  &:hover {
    transform: scale(1.05); }
 
 ` 

const PhotoText = styled.h1 `
text-align: center;

`


interface AlbumProps {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export async function albumLoader({ params }: { params: { albumId: string } }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
  );
  const albums = await response.json();
  console.log(albums);
  return albums;
}

export const Albums = () => {
  const albums = useLoaderData() as AlbumProps[];
  return (
    <>
      <PhotoText>Albums</PhotoText>
      {albums.map((album) => (
     
        <Photo key={album.id}>
       
          <div>{album.id} </div>
          <div>
     
            <img src={album.thumbnailUrl} alt="" />
          </div>
          <div>{album.title} </div>
        </Photo>
      ))}
    </>
  );
};
