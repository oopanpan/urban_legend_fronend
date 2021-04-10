import axios from 'axios';

const BACKEND_API = 'http://localhost:3000/api/v1';

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


//* comment requests



//* third party api request

const api={
    user:{
        postSignup
    },
    post:{
        
    },
    comment:{

    },
    teleport:{

    }
};

export default api;