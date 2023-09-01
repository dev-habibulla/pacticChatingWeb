import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";

import { getAuth, signOut } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

const Home = () => {
  const auth = getAuth();
  const db = getDatabase();

  let navigate = useNavigate();

  let [inputValue, setInputValue] = useState({
    tName: "",
    tDes: "",
  });

  let [taskPushArr, setTaskPushArr] = useState([]);
  let [id, setId] = useState("");
  let [updateOn, setUpdateOn] = useState(true);

  useEffect(() => {
    const toDoRef = ref(db, "toDo");
    onValue(toDoRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((iteam) => {
        arr.push({ ...iteam.val(), id: iteam.key });
      });
      setTaskPushArr(arr);
    });
  }, []);

  let handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  let handlesubmit = () => {
    set(push(ref(db, "toDo")), {
      taskName: inputValue.tName,
      taskDescription: inputValue.tDes,
    });
  };

  let handleDelete = (id) => {
    remove(ref(db, "toDo/" + id));
  };
  let handleEdit = (iteam) => {
    setInputValue({
      tName: iteam.taskName,
      tDes: iteam.taskDescription,
    });
    setId(iteam.id);
    setUpdateOn(false)
  };

  let handleUpdate = () => {
    update(ref(db, "toDo/" + id), {
      taskName: inputValue.tName,
      taskDescription: inputValue.tDes,
    });
    setUpdateOn(true)
  };

  let handleLogOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("Sign out successful", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    });
  };

  return (
    <div>
      <TextField
        onChange={handleChange}
        className="inputcss"
        name="tName"
        type="text"
        id="outlined-basic"
        label="task name"
        variant="outlined"
        value={inputValue.tName}
      />
      <TextField
        onChange={handleChange}
        className="inputcss"
        name="tDes"
        type="text"
        id="outlined-basic"
        label="task  description"
        variant="outlined"
        value={inputValue.tDes}
      />

{updateOn ? 
<Button onClick={handlesubmit} variant="contained">
        Submit
      </Button> 
      :
      <Button onClick={handleUpdate} variant="contained">
      Update
    </Button>
      }
     
      <br /> <br />
      {taskPushArr.map((iteam) => (
        <h1>
          {iteam.taskName}--{iteam.taskDescription}--
          <Button onClick={() => handleDelete(iteam.id)} variant="contained">
            Delete
          </Button>{" "}
          ----
          <Button onClick={() => handleEdit(iteam)} variant="contained">
            Edit
          </Button>
        </h1>
      ))}
      <Button onClick={handleLogOut} variant="contained">
        Log Out
      </Button>{" "}
      <br />
    </div>
  );
};

export default Home;
