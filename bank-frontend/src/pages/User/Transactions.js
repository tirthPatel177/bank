import { Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import { getUserTransactions } from "../../apis/transactionsApi";
import Layout from "../../components/Layout";
import moment from "moment";

const HistoryTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div className="table-container">
      <table {...getTableProps()} className="general-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Transactions = () => {
  const [txHistory, settxHistory] = useState([]);
  const user = useSelector((state) => state.user);

  const fetchTransactions = async (accNo) => {
    const result = await getUserTransactions({ accountNo: accNo });
    if (result === false) {
      // Toast error
      console.error("Error in fetching transactions");
    } else {
      console.log("Transactions: ", result);
      let txs = [];
      let count = 0;
      result.data.transactions.forEach((tx) => {
        txs.push({
          id: tx.id,
          sender: tx.from.accountNo,
          receiver: tx.to.accountNo,
          amount: tx.amount,
          date: moment(tx.date).format("MMMM Do YYYY, h:mm:ss a"),
          serialNo: ++count,
        });
      });
      settxHistory(txs);
    }
  };

  useEffect(() => {
    fetchTransactions(user.accNo);
  }, [user]);

  const columns = useMemo(
    () => [
      {
        Header: "Sr No",
        accessor: "serialNo",
      },
      {
        Header: "Sender",
        accessor: "sender",
      },
      {
        Header: "Receiver",
        accessor: "receiver",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );
  return (
    <Layout>
      <div className="py-10 px-4">
        <Typography variant="h4" component="h2">
          Transactions
        </Typography>
        <HistoryTable columns={columns} data={txHistory} />
      </div>
    </Layout> 
  );
};

export default Transactions;
