import React from 'react';

const UserDetailsPage = async ({params}) => {
    const {userId}= await params

    const res = await fetch(`http://localhost:5000/users/${userId}`)
    const user =  await res.json();
    console.log('user', user)
    return (
        <div>
           <h1>userDetails page:{userId}</h1> 
           <h1>Name: {user.name}</h1>
           <h1>Email: {user.email}</h1>
        </div>
    );
};

export default UserDetailsPage;