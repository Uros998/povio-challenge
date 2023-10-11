import './App.scss';
import {Route, Routes} from "react-router-dom";
import HomePage from "./page/home-page/home-page";
import TaskOverviewPage from "./page/task-overview-page/task-overview-page";
import {useEffect} from "react";
import {getAllTasks, localStorageList} from "./services/task.service";

function App() {

    useEffect(() => {
        localStorageList();
    }, []);

  return (
      <>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/overview/:id" element={<TaskOverviewPage/>}/>
        </Routes>
      </>
  );
}

export default App;
