//import { } from ''; // Colocar aqui o store.
//possivelmente retirar o asyncStorage no futuro
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL, KEY } from './config';
import { popUpErroGenerico } from '../screens/PopUpErroGenerico';
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
        console.log(object)
        const obj = {
            email: object.email,
            password: object.password,
            fullName: object.fullName,
            cpf: object.cpf,
            key: KEY
        }
        try {
            const aux = await axios.post(`/user`, obj);
            const req = await aux.data
            console.log(req)
            login(req.email,object.password,callback)
            popUpErroGenerico({ type: 'customSuccess', text1: 'Usuário cadastrado com sucesso', text2: `Por favor aguarde enquanto iniciamos a sua sessão` })
            return req
        } catch (e) {
            console.log(`Error while registering user: ${e}`);
            popUpErroGenerico({ type: 'customError', text1: 'Alguma coisa aconteceu', text2: `Por favor verfique os dados, a sua conexão e tente novamente` })
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
            userInfo['user'] = aux;
            setUserInfo(userInfo);
            return userInfo;
            
        } catch (e) {
            console.log(`Error while getting user: ${e}`);
            popUpErroGenerico({ type: 'customError', text1: 'Alguma coisa aconteceu', text2: `Por favor verfique os dados, a sua conexão e tente novamente` })
            return;
        }

    } catch (e) {
        console.log(`Error while auth: ${e}`);
        return;
    }finally {
        try {
            callback(false)
            popUpErroGenerico({ type: 'customSuccess', text1: 'Sessão Iniciada com sucesso', text2: `Bem-Vindo{a) de volta ${userInfo.user.fullName}` })
        } catch (e) {
            console.log(`Login Finaly error: ${e}`)
            popUpErroGenerico({ type: 'customError', text1: 'Alguma coisa aconteceu', text2: `Por favor verfique os dados, a sua conexão e tente novamente` })
            return;
        }

    }

    //
    //const config = { headers: { 'Authorization': `Bearer ${aux.access_token}` } };// Previamente, será utilizado um token para autorização.
    //dispatch(funcaoStore(userInfo)); Para salvar o usuario na store
};
//LOGOUT
const logout = () => {
    setUserInfo({})
    popUpErroGenerico({ type: 'customInfo', text1: 'Volte Novamente', text2:'Usuário deslogado com sucesso'})

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