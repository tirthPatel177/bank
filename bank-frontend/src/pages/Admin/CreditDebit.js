import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { creditApi } from "../../apis/creditApi";
import { debitApi } from "../../apis/debitApi";
import Layout from "../../components/Layout";
import { errorToast, successToast } from "../../redux/services/toast";

const CreditDebit = () => {
  const [credit, setCredit] = useState(true);

  const [accountNo, setAccountNo] = useState(undefined);
  const [amount, setAmount] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credit) {
      // credit
      const crRes = await creditApi({ accountNo, amount });
      if (crRes === false) {
        // error
        errorToast("Error in credit");
      } else {
        // success
        successToast("Credit successful");
      }
    } else {
      const dtRs = await debitApi({ accountNo, amount });
      if (dtRs === false) {
        // error
        errorToast("Error in debit");
      } else {
        // success
        successToast("Debit successful");
      }
    }
  };

  return (
    <Layout>
      <div className="w-8/12 mx-auto text-center">
        <div className="flex justify-center gap-4 py-7">
          <h3
            onClick={() => setCredit(true)}
            className="cursor-pointer px-5 py-2"
            style={{
              color: credit ? "#0177FB" : "black",
              backgroundColor: credit ? "#E5F1FF" : "white",
              borderRadius: "15px",
            }}
          >
            Credit
          </h3>
          <h3
            onClick={() => setCredit(false)}
            className="cursor-pointer px-5 py-2"
            style={{
              color: credit ? "black" : "#0177FB",
              backgroundColor: credit ? "white" : "#E5F1FF",
              borderRadius: "15px",
            }}
          >
            Debit
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <TextField
              required
              label="Account No"
              variant="outlined"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
            />
            <TextField
              required
              label="Amount"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {credit ? "Credit" : "Debit"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreditDebit;
