import React from 'react';

import UserCard from '../../components/UserCard'



// 
const Userspage = async() => {

    // Data fetch:
    const res = await fetch('http://localhost:5000/users')
    const users = await res.json()
    return (
        <div>
            <h1>users length : {users.length}</h1>
            <div className='grid grid-cols-3 gap-2 mx-5'>
                {
                   users.map(user => <UserCard key = {user._id} user={user}></UserCard> )
                }
            </div>
        </div>
    );
};

export default Userspage;