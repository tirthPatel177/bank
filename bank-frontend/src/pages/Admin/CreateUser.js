import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { createUserApi } from "../../apis/createUserApi";
import CenterModalLayout from "../../components/CenterModal";
import { errorToast, successToast } from "../../redux/services/toast";

const CreateUser = ({ modalstate, setModalstate }) => {
  const [userName, setuserName] = useState(undefined);
  const [email, setemail] = useState(undefined);
  const [password, setpassword] = useState(undefined);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const result = await createUserApi({ name: userName, email, password });
    if (result === false) {
      console.error("Error creating user");
      errorToast("Error creating user");
    } else {
      // Success Toastify
      setModalstate(false);

      successToast("User created successfully");
    }
  };

  return (
    <CenterModalLayout modalstate={modalstate} setModalstate={setModalstate}>
      <div className="p-8">
        <h3>Create User</h3>
        <form>
          <div className="flex flex-col gap-6 py-6">
            <TextField
              label="Name"
              variant="outlined"
              value={userName}
              onChange={(e) => {
                setuserName(e.target.value);
              }}
              required
            />

            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              required
            />

            <TextField
              label="Password"
              variant="outlined"
              value={password}
              type="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className="mt-4"
            onClick={(e) => {
              handleCreateUser(e);
            }}
          >
            Create User
          </Button>
        </form>
      </div>
    </CenterModalLayout>
  );
};

export default CreateUser;
