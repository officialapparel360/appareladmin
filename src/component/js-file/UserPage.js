import React, { useState, useEffect } from "react";
import "../css-file/UserPage.css";

const initialFormState = {
  userName: "",
  mobileNo: "",
  password: "",
  name: "",
  emailId: "",
  adharCardNo: "",
  dob: "",
  role: "",
};

const UserPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://apparels360.in/api/Account/GetEmployeeUsers");
      if (response.ok) {
        const data = await response.json();
        setUsers(Array.isArray(data.data) ? data.data : []);
      } else {
        console.error("Failed to fetch users.");
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUserClick = () => {
    setForm(initialFormState);
    setShowForm(true);
    setEditingUserId(null);
  };

  const handleCancel = () => {
    const isFormDirty = Object.values(form).some((val) => val.trim() !== "");
    if (isFormDirty) {
      const confirmClose = window.confirm("Are you sure you want to discard this form?");
      if (!confirmClose) return;
    }
    setShowForm(false);
    setForm(initialFormState);
    setEditingUserId(null);
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingUserId(user.userID);
    setShowForm(true);
  };

  const handleDelete = (userID) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.userID !== userID));
    }
  };

  const validateForm = () => {
    const { userName, mobileNo, password, name, emailId, adharCardNo, dob, role } = form;
    const errors = [];

    if (!userName) errors.push("Username is required");
    if (!/^\d{10}$/.test(mobileNo)) errors.push("Mobile number must be 10 digits");
    if (!password || password.length < 6) errors.push("Password must be at least 6 characters");
    if (!name) errors.push("Name is required");
    if (!emailId || !/^\S+@\S+\.\S+$/.test(emailId)) errors.push("Valid email is required");
    if (!adharCardNo || adharCardNo.length !== 12) errors.push("Aadhar number must be 12 digits");
    if (!dob) errors.push("Date of birth is required");
    if (!role) errors.push("Role is required");

    return errors;
  };

  const addUser = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }

    const payload = {
      isActive: 1,
      createdBy: 0,
      modifiedBy: 0,
      createdOn: new Date().toISOString(),
      modifiedOn: new Date().toISOString(),
      userID: editingUserId || crypto.randomUUID(),
      roleId: parseInt(form.role),
      userName: form.userName,
      mobileNo: form.mobileNo,
      password: form.password,
      name: form.name,
      emailId: form.emailId,
      adharCardNo: form.adharCardNo,
      dob: form.dob,
      createdByIP: "127.0.0.1",
    };

    try {
      const response = await fetch("http://apparels360.in/api/Account/AddEmployeeUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("User saved successfully");
        setForm(initialFormState);
        setShowForm(false);
        setEditingUserId(null);
        await fetchUsers(); // Refresh data
      } else {
        alert("Error saving user");
      }
    } catch (error) {
      console.error("API error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="user-page">
      <div className="user-header">
        <h2>User List</h2>
        {!showForm && (
          <button className="add-btn" onClick={handleAddUserClick}>
            ➕ Add User
          </button>
        )}
      </div>

      {showForm && (
        <div className="form-grid">
          <input name="userName" value={form.userName} onChange={handleChange} placeholder="Username" />
          <input name="mobileNo" value={form.mobileNo} onChange={handleChange} placeholder="Mobile Number" />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
          <input name="emailId" value={form.emailId} onChange={handleChange} placeholder="Email" />
          <input name="adharCardNo" value={form.adharCardNo} onChange={handleChange} placeholder="Aadhar Card Number" />
          <input name="dob" type="date" value={form.dob} onChange={handleChange} />
          <input name="role" value={form.role} onChange={handleChange} placeholder="Role ID" />
          <div className="form-actions">
            <button className="submit-btn" onClick={addUser} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      <div className="user-list">
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p className="no-user">No users available</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>User Name</th>
                <th>Mobile No</th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Adhar Card No</th>
                <th>Date of Birth</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.map((user, index) => (
                <tr key={user.userID || index}>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.mobileNo}</td>
                  <td>{user.name}</td>
                  <td>{user.emailId}</td>
                  <td>{user.adharCardNo}</td>
                  <td>{user.dob}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.userID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserPage;
