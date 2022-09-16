//import { } from ''; // Colocar aqui o store.
//possivelmente retirar o asyncStorage no futuro
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL, KEY } from './config';
//import { useDispatch, useSelector } from 'react-redux'; //-> Para armazenar no redux. Se são for utilizado outro tipo de redux
//Cria um contexto para ser utilizado pelos elementos filho
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // const store = useSelector(({ user }) => { //Possiel store de user
    //     return {
    //         user: user
    //     }
    // })

    //const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({});
    //The axios configs
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    //Testar abaixo
    //  axios.interceptors.request.use(function (request ) {
    //      console.log('Starting Request', JSON.stringify(request, null, 2))
    //      return request;
    //  }, function (error) {
    //  	 return Promise.reject(error);
    //  });

    //   axios.interceptors.response.use(function (response) {
    //      console.log('Response:', JSON.stringify(response, null, 2))
    //  	 return response;
    //  }, function (error) {
    //  	 return Promise.reject(error);
    //  });

    //REGISTER
    const register = async (object, callback) => {
        const obj = {
            email: object.email,
            password: object.password,
            fullName: object.fullName,
            key: KEY
        }
        try {
            const aux = await axios.post(`/user`, obj);
            const req = await aux.data
            login(req.email,object.password,callback)
            return req
        } catch (e) {
            console.log(`Error while registering user: ${e}`);
            return e;
        } 

    
};

const login = async (email, password, callback) => {
    let userInfo = {};
    let aux;

    try {
        const res = await axios.post(`/auth`, { email, password });
        aux = await res.data;
        userInfo["access_token"] = aux.access_token;

        try {
            const config = { headers: { 'Authorization': `Bearer ${aux.access_token}` } };
            const resLogin = await axios.get(`/user`, config);

            aux = await resLogin.data;
            userInfo['user'] = aux.user;

            setUserInfo(userInfo);
            return userInfo;
            
        } catch (e) {
            console.log(`Error while getting user: ${e}`);
            return e;
        }

    } catch (e) {
        console.log(`Error while auth: ${e}`);
        return e
    }finally {
        try {
            callback(false)
        } catch (e) {
            console.log(`Login Finaly error: ${e}`)
        }

    }

    //
    //const config = { headers: { 'Authorization': `Bearer ${aux.access_token}` } };// Previamente, será utilizado um token para autorização.
    //dispatch(funcaoStore(userInfo)); Para salvar o usuario na store
};
//LOGOUT
const logout = () => {
};

const isLoggedIn = async () => {
};


return (
    <AuthContext.Provider
        value={{
            userInfo,
            register,
            login,
            logout,
        }}>
        {children}
    </AuthContext.Provider>
);
};