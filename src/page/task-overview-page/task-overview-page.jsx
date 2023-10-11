import "./task-overview-page.style.scss";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTaskById, updateTask} from "../../services/task.service";
import * as Material from "@mui/material";
import Statuses from "../../mock-data/statuses.json";
import useStore from "../../services/zustand/zustand";
import {toast, ToastContainer} from "react-toastify";


const TaskOverviewPage = () => {

    const [formData, setFormData] = useState({
        id: undefined,
        title: '',
        note: '',
        status: ''
    });

    const {editTask} = useStore();


    useEffect(() => {
        getTaskById(id).then(data => {
            const newStatus = statusesList.find(s => s?.label === data?.status)?.value;
            const newTask = {id: data?.id, title: data?.title, note: data?.note, status: newStatus};
            setFormData(newTask);
        });
    }, []);

    useEffect(() => {
        statusesList = Statuses;
    }, []);

    let statusesList;

    const {id} = useParams();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newStatus = Statuses.find(s => s.value === formData.status).label;
        const newTask = {id: formData.id, title: formData.title, note: formData.note, status: newStatus};

        updateTask(newTask)
            .then(updated => {
                editTask(updated);
                const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
                taskList[updated.id - 1] = updated;
                localStorage.setItem('taskList', JSON.stringify(taskList));
                toast.success('Uspesno sacuvano!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose:1000,
                })
            })
            .catch(console.error);
    };

    const handleButtonClick = () => {
        window.location.href = `/`;
    };

    return (
        <div>
            <div className="overview-wrapper">
                <div className="back-btn">
                    <Material.Button variant="contained" onClick={handleButtonClick} color="primary">
                        Nazad
                    </Material.Button>
                </div>
                <div className="overview-title">
                    <h2>PREGLED ZADATKA</h2>
                </div>

                <div className="form-wrapper">
                    <form onSubmit={handleSubmit} className="form">

                        <Material.TextField
                            id="outlined-basic"
                            className="dialog-input"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />

                        <Material.TextField
                            id="outlined-basic"
                            className="dialog-input"
                            type="text"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                        />

                        <Material.TextField
                            id="outlined-select-currency"
                            className="dialog-input"
                            select
                            type="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {Statuses.map((option) => (
                                <Material.MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </Material.MenuItem>
                            ))}

                        </Material.TextField>


                        <Material.Button type="submit" variant="outlined" color="success">
                            Izmeni
                        </Material.Button>
                        <ToastContainer/>
                    </form>
                </div>
            </div>
        </div>
    );

}


export default TaskOverviewPage;
