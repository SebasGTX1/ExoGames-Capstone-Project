import React, { useState } from "react";
import Select from 'react-select';
import { Formik } from 'formik';
import { createCompetitorRequest } from "../api/competitors.api";
import styles from '../components/styles/CreateEvent.module.css'
import stylesSelect from '../components/styles/SelectComponent.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { uploadFile } from "../api/upload.api";

const options = [
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'baseball', label: 'Baseball' },
    { value: 'archery', label: 'Archery' },
    { value: 'paintball', label: 'Paintball' }
]

export function CreateCompetitor() {
    const navigate = useNavigate();
    const location = useLocation()
    const [ optionSelected, setOptionSelected ] = useState('football')
    let { user_id, token, username } = {};

    const [file, setSaveFile] = useState(null);

    const handleChangeFile = (event) => {
        setSaveFile(event.target.files[0])

    }


    if (!(location.state)) {
        user_id = window.localStorage.getItem("user_id");
        token = window.localStorage.getItem("token");
        username = window.localStorage.getItem("username");
        

    }
    else {
        user_id = location.state.user_id;
        token = location.state.token;
        username = location.state.username;
    }

    const handleChangeSelected = (selectedOption) => {
        setOptionSelected(selectedOption.value);
    };
    return (
        <div className={styles.center}>
            <h1>Create competitor</h1>
            <Formik
                initialValues={{
                    user_id: user_id,
                    name: "",
                    team_players: "",
                    description: "",
                    sport: "football",
                    image: ""

                }}
                onSubmit={async (values, actions) => {
                    values.sport = optionSelected;
                    try {
                        const resp = await uploadFile(file);
                        
                        values.image = resp.data.url;

                        
                    } catch (error) {
                        console.log(error);
                        
                    }

                    try {
                        await createCompetitorRequest(values, token);
                        actions.resetForm();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/my_competitors', {
                            state: {
                                user_id: user_id,
                                token: token,
                                username: username
                            }
                        })
                    } catch (error) {
                        console.log(error)

                    }
                }}

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <h3></h3>
                        <input type="text" name="name"
                            placeholder="Competitor Name"
                            onChange={props.handleChange}
                            value={props.values.name}
                            required />
                        <h3></h3>
                        <textarea
                            name="team_players"
                            rows="3"
                            placeholder="Team Players"
                            onChange={props.handleChange}
                            value={props.values.team_players} />
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"
                            onChange={props.handleChange}
                            value={props.values.description} />
                        <h3></h3>
                        <Select name="sport" type="text" className={stylesSelect.SelectComponent} classNamePrefix="Select" options={options} onChange={handleChangeSelected}/>
                        <h3></h3>

                        <h1>Upload an image</h1>
                        <h3></h3>
                        <input type="file" name="image" accept="image/jpeg" onChange={handleChangeFile} />
                        <br />
                        <button type="reset" >Reset</button>
                        <button type="submit">Submit</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}