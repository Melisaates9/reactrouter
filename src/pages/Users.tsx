/* eslint-disable react-refresh/only-export-components */
import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
}
const CardUser = styled.div`
  padding: 4em;
  background: #336c3bef;
  color: #fff9fb;
  margin-bottom: 10px;
`;
const Cardbtn = styled.button`
  background-color: #5bdddd90;
  padding-inline: 20px;
  margin-top: 6px;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  border: none;
`;

export async function usersLoader() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users;
}

export const Users = () => {
  const users = useLoaderData() as UserProps[];
//jsonı sayfaya yazdırma kısmı
  return (
    <>
      <div>users</div>
      {users.map((user) => (
        <CardUser key={user.id}>
          <div> {user.name} </div>
          <div> {user.username} </div>
          <div> {user.email} </div>
          <Cardbtn>
            <Link to={`/users/${user.id}`}>Git </Link>
          </Cardbtn>
        </CardUser>
      ))}
    </>
  );
};
