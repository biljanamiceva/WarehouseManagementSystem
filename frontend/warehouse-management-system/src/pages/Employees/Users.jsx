import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = ({handleEmployeesChange}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    handleEmployeesChange(users);
  }, [users]);

  const fetchData = () => {
    axios
      .get("https://localhost:7076/api/User")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleDelete = (userId, userName) => {
    setSelectedUserName(userName); 
    setShowDeleteModal(true);
    setSelectedUserId(userId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7076/api/User/${selectedUserId}`)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== selectedUserId)
        );

        setShowDeleteModal(false);
        setSelectedUserId(null);
        setSelectedUserName("");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setShowDeleteModal(false);
        setSelectedUserId(null);
        setSelectedUserName("");
      });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedUserId(null);
    setSelectedUserName("");
  };

  return (
    <div className="table_details">
      <div className="allData">
      <div className="cardHeader">
          <h2>All Employees</h2>
          <Link to="/register" className="btn">
            Register new Employee
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <td>#</td>
               
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.userId}>
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role !== "Admin" && (
                      <RiDeleteBinLine
                        onClick={() => handleDelete(user.userId, user.userName)} className="app_actionBtn"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete <strong>{selectedUserName}</strong>?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
