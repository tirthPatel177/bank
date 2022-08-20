import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getAllUsersApi } from "../../apis/getAllUsersApi";
import Layout from "../../components/Layout";
import { useSelector, connect } from "react-redux";
import CreateUser from "./CreateUser";
import { useTable } from "react-table";

const UserTable = ({ columns, data }) => {
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

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [createUserModal, setCreateUserModal] = useState(false);
  const userType = useSelector((state) => state.user.userType);

  const fetchAllUsers = async () => {
    const result = await getAllUsersApi();
    if (result === false) {
      // Toast error
      console.error("Error in fetching users");
    } else {
      console.log("Users: ", result);
      let newUsers = [];
      result?.data?.users.forEach((user) => {
        newUsers.push({
          id: user._id,
          name: user.name,
          email: user.email,
          accountNo: user.accountNo,
          balance: user.balance,
          userType: user.role,
        });
      });
      setUsers(newUsers);
    }
  };
  const columns = useMemo(() => {
    return [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Account No",
        accessor: "accountNo",
      },
      {
        Header: "Balance",
        accessor: "balance",
      },
      {
        Header: "User Type",
        accessor: "userType",
      },
    ];
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (createUserModal === false) {
      fetchAllUsers();
    }
  }, [createUserModal]);

  return (
    <div>
      <Layout>
        <div className="p-8">
          {userType !== "admin" ? (
            <h3>You are not allowed to view this page</h3>
          ) : (
            <div>
              <div className="py-4">Bank Users</div>

              <UserTable columns={columns} data={users} />

              <div className="text-center py-8">
                <Button
                  onClick={() => setCreateUserModal(true)}
                  variant="contained"
                >
                  Create New User
                </Button>
              </div>
            </div>
          )}
        </div>

        <CreateUser
          modalstate={createUserModal}
          setModalstate={setCreateUserModal}
        />
      </Layout>
    </div>
  );
};

export default connect()(UsersList);
