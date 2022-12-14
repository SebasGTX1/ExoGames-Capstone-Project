import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Formik } from 'formik';
import { createEventRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'
import Swal from 'sweetalert2'
import { LoginRequest } from "../api/users.api";

export function LoginPage() {

    const navigate = useNavigate();

    const goRegister =()=>{
        navigate('/register')
    };
    return (
        <div className={styles.center}>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email:"",
                    password:""

                }}
                onSubmit={async (values, actions) => {
                    try {
                        const resp = await LoginRequest(values);
                        const data = resp.data
                        window.localStorage.setItem("user_id", data.user_id);
                        window.localStorage.setItem("token", data.token);
                        window.localStorage.setItem("username", data.username);
                        navigate('/my_events',{
                            state: {
                              user_id: data.user_id,
                              username:data.username,
                              token: data.token
                            }});
                    } catch (error) {
                        console.log(error.response.data.data)
                        Swal.fire({
                            position: 'top-end',
                            title: error.response.data.data,
                            icon: 'warning',
                            showConfirmButton: false,
                            timer: 1500
                          })

                    }
                }}

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <h3></h3>
                        <input name="email"
                        type="text" 
                        placeholder="email"
                        onChange={props.handleChange}
                        value={props.email} required/>
                        <h3></h3>
                        <input name="password"
                        type="password" 
                        placeholder="password"
                        onChange={props.handleChange}
                        value={props.password} required/>
                        <br /><br />
                        <button type="submit">Login</button>
                        <button onClick={goRegister}>Register</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}