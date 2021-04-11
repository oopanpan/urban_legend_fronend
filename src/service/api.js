import axios from 'axios';

const BACKEND_API = 'http://localhost:3000/api/v1';

const TELEPORT_API = 'https://api.teleport.org/api/';

const token = () =>  localStorage.getItem('token');

const headers = () => {
    return {
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token()
    }};
};

//* user requests
const postSignup = async obj =>{
    const res = await axios.post(`${BACKEND_API}/users`, obj, headers());
    return res.data;
}

const getCurrentUser = async () =>{
    const res = await axios.get(`${BACKEND_API}/profile`, headers());
    return res.data;
}

//! fetch backup
// const Signup = async data => {
//     return await fetch(`${BACKEND_API}/users`, {
//         method: 'POST',
//         headers: headers(),
//         body: JSON.stringify({
//             user: data
//         })
//     })
//     .then(res => res.json())
// };

//* posts requests

const getAllPosts = async () =>{
    const res = await axios.get(`${BACKEND_API}/posts`)
    return res.data
}


//* comment requests



//* third party api request

const getAllConts = async() =>{
    const res = await axios.get('https://api.teleport.org/api/continents/');
    return res.data
}


//* object to export with swag
const api={
    user:{
        postSignup,
        getCurrentUser
    },
    post:{
        getAllPosts
    },
    comment:{

    },
    teleport:{
        getAllConts
    }
};

export default api;