
import { useLoaderData, useParams } from 'react-router-dom'

export async function userDetail({params}:any) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userid}`)
    const user =await response.json()
    console.log(user)
    return user

}
export const UserDetail = () => {
    const userid= useParams()
    const user = useLoaderData()
  return (
    <div>UserDetail</div>

  )

}

