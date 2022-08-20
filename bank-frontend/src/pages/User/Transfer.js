import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector, connect } from "react-redux";
import { transferApi } from "../../apis/transactionsApi";
import Layout from "../../components/Layout";
import { errorToast, successToast } from "../../redux/services/toast";

const Transfer = () => {
  const [receiver, setreceiver] = useState(undefined);
  const [amount, setamount] = useState(0);

  const user = useSelector((state) => state.user);

  // TODO: Add validation for amount
  // Input amount should be a number > 0
  // Check on the fly if the receiver is valid
  // Add Toastify for incidating success
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("receiver: ", receiver);
    console.log("amount: ", amount);
    const result = await transferApi({
      from: {
        accountNo: user.accNo,
      },
      to: {
        accountNo: receiver,
      },
      amount,
    });
    if (result === false) {
      // Toast error
      console.error("Error in transfer");
      errorToast("Error in transfer");
    } else {
      successToast("Transfer successful");
    }
  };

  return (
    <div>
      <Layout>
        <div className="p-8">
          <h3 className="py-2">Transfer</h3>
          <form className="text-center" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 py-8">
              <TextField
                required
                id="outlined-required"
                label="Receiver Acc No"
                value={receiver}
                onChange={(e) => setreceiver(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Amount"
                value={amount}
                onChange={(e) => setamount(e.target.value)}
              />
              {/* <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  // value={values.amount}
                  // onChange={handleChange("amount")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl> */}
            </div>
            <Button
              variant="contained"
              size="large"
              className="mx-auto"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Transfer
            </Button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default connect()(Transfer);
