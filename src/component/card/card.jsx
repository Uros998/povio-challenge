import * as Material from "@mui/material";
import "./card.style.scss";


function Card({data, deleteTask}) {

    const handleDeleteClick = () => {
        deleteTask(data.id);
    }
    const handleButtonClick = () => {
        const taskID = data.id;
        window.location.href = `/overview/${taskID}`;
    };

    return (
        <Material.Card className="card">
            <Material.CardContent>
                <div className="status-wrapper">
                    <Material.Typography variant="body2" className="status" color="text.secondary">
                        {data?.status}
                    </Material.Typography>
                    <Material.Typography variant="h6" color="text.secondary">
                        {data?.subStatus}
                    </Material.Typography>
                </div>
                <hr/>
                <Material.Typography gutterBottom variant="h5" component="div">
                    {data?.title}
                </Material.Typography>
                <Material.Typography variant="body2" color="text.secondary">
                    {data?.note}
                </Material.Typography>

            </Material.CardContent>
            <Material.CardActions>
                <Material.Button variant="contained" color="success" onClick={handleButtonClick}>
                    Edit
                </Material.Button>
                <Material.Button onClick={handleDeleteClick} variant="outlined" color="error">
                    Delete
                </Material.Button>
            </Material.CardActions>
        </Material.Card>
    );
}

export default Card;

