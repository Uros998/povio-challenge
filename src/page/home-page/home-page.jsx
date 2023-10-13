import "./home-page.style.scss";
import * as Material from "@mui/material";
import {useEffect, useState} from "react";
import Card from "../../component/card/card"
import {getAllTasks, saveTask} from "../../services/task.service";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Statuses from "../../mock-data/statuses.json";
import useStore from "../../services/zustand/zustand";


function HomePage() {


    const [formData, setFormData] = useState({
        id: undefined,
        title: '',
        note: '',
        status: '',
    });


    useEffect(() => {
        getAllTasks().then(setTasks);
    }, []);

    const {tasks, filterStatus, setFilterStatus, setTasks, addTask} = useStore()

    const [open, setOpen] = useState(false);

    let filterTasks =
        filterStatus === 'all'
            ? tasks
            : tasks.filter((task) => task.status === filterStatus);



    const handleSubmit = (event) => {
        event.preventDefault();
        const newId = tasks[tasks.length - 1].id + 1;
        const newStatus = Statuses.find(s => s.value === formData.status)?.label;
        const newTask = {id: newId, title: formData.title, note: formData.note, status: newStatus};

        if (newTask.note !== '' && newTask.title !== '' && newTask.status !== undefined) {
            saveTask(newTask)
                .then(saved => {
                    addTask(saved);
                    setOpen(false);
                })
                .catch(console.error)
                .finally(() => setFormData({id: undefined, title: "", note: "", status: ""}));
        } else {
            toast.error('Niste uneli sve podatke!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };

    const deleteTask = (taskId) => {
        const newList = tasks.filter((task) => task.id !== taskId);
        setTasks(newList);
        localStorage.setItem("taskList", JSON.stringify(newList));
    }


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };


    return (
        <>
            <div className="home-wrapper">
                <div className="home-title">
                    <h2>Otplovio demo</h2>
                </div>
                <div className="home-btn">
                    <div className="add-btn">
                        <Material.Button variant="contained" onClick={() => setOpen(true)} color="info">
                            Add post
                        </Material.Button>
                    </div>
                    <div className="filter-btn">
                        <Material.Button variant="contained" onClick={() => setFilterStatus('all')} color="secondary">
                            All
                        </Material.Button>
                        <Material.Button variant="contained" onClick={() => setFilterStatus('Development')}
                                         color="secondary">
                            Development
                        </Material.Button>
                        <Material.Button variant="contained" onClick={() => setFilterStatus('Services')}
                                         color="secondary">
                            Services
                        </Material.Button>
                    </div>
                </div>
                <div>
                    <Material.Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth
                        maxWidth="sm"
                        className="dialog-wrapper"
                    >
                        <div className="dialog-title">
                            <h2>Dodaj novi zadatak</h2>
                        </div>

                        <Material.DialogContent className="dialog-content">
                            <form onSubmit={handleSubmit} className="form">

                                <Material.TextField id="outlined-basic"
                                                    name="title"
                                                    className="dialog-input"
                                                    label="Naziv"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    variant="outlined"/>

                                <Material.TextField id="outlined-basic"
                                                    name="note"
                                                    className="dialog-input"
                                                    label="Opis"
                                                    value={formData.note}
                                                    onChange={handleChange}
                                                    variant="outlined"/>
                                <Material.TextField
                                    id="outlined-select-currency"
                                    select
                                    className="dialog-input"
                                    name="status"
                                    onChange={handleChange}
                                    label="Status"
                                    value={formData.status}
                                >
                                    {Statuses.map((option) => (
                                        <Material.MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </Material.MenuItem>
                                    ))}

                                </Material.TextField>
                                <ToastContainer/>
                                <Material.Button type="submit" variant="outlined" color="success">
                                    Save
                                </Material.Button>
                            </form>
                        </Material.DialogContent>

                    </Material.Dialog>
                </div>
                <div className="home-content">
                    <div className="filter-wrapper">
                        <div className="filters">
                            <Material.FormLabel id="demo-radio-buttons-group-label">Frontend</Material.FormLabel>
                            <Material.RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <Material.FormControlLabel value="ract"  control={<Material.Checkbox />} label="React" />
                                <Material.FormControlLabel value="angular"  control={<Material.Checkbox />} label="Angular" />
                            </Material.RadioGroup>
                            <Material.FormLabel id="demo-radio-buttons-group-label">Backend</Material.FormLabel>
                            <Material.RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <Material.FormControlLabel value="java" control={<Material.Checkbox />} label="Spring boot" />
                                <Material.FormControlLabel value="ract" control={<Material.Checkbox />} label="Node" />
                            </Material.RadioGroup>
                            <Material.FormLabel id="demo-radio-buttons-group-label">Design</Material.FormLabel>
                            <Material.RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <Material.FormControlLabel value="java" control={<Material.Checkbox />} label="UI/UX" />
                                <Material.FormControlLabel value="ract" control={<Material.Checkbox />} label="Graphic Desing" />
                                <Material.FormControlLabel value="angular" control={<Material.Checkbox />} label="Adobe" />
                            </Material.RadioGroup>
                        </div>
                    </div>
                    <div className="cards-wrapper">
                        {filterTasks.map((cardData) => (
                            <Card key={cardData.id} data={cardData} deleteTask={deleteTask}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}

export default HomePage;
