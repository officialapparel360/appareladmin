import { useState, useEffect } from "react";

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

export function useEmployeePageLogic() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [isUserEditting, setisUserEditting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://apparels360.in/api/Account/GetAll");
      const data = await response.json();
      setUsers(Array.isArray(data.data) ? data.data : []);
    } catch {
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
    if (!isFormDirty || window.confirm("Discard changes?")) {
      setShowForm(false);
      setForm(initialFormState);
      setEditingUserId(null);
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingUserId(user.userID);
    setShowForm(true);
    setisUserEditting(true);

  };

  const handleDelete = async (userID) => {
    if (window.confirm("Delete this employee?")) {
      setUsers((prev) => prev.filter((u) => u.userID !== userID));
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!form.userName) errors.push("Username is required");
    if (!/^\d{10}$/.test(form.mobileNo)) errors.push("Mobile must be 10 digits");
    if (!form.password || form.password.length < 6) errors.push("Password too short");
    if (!form.name) errors.push("Name is required");
    if (!form.emailId || !/^\S+@\S+\.\S+$/.test(form.emailId)) errors.push("Email is invalid");
    if (!form.adharCardNo || form.adharCardNo.length !== 12) errors.push("Aadhar must be 12 digits");
    if (!form.dob) errors.push("DOB is required");
    if (!form.role) errors.push("Role is required");
    return errors;
  };

  const addEmployee = async () => {
    const errors = validateForm();
    if (errors.length > 0) return alert(errors.join("\n"));

    const payload = {
      isActive: true,
      createdBy: 0,
      modifiedBy: 0,
      createdOn: new Date().toISOString(),
      modifiedOn: new Date().toISOString(),
      userID: editingUserId || crypto.randomUUID(),
      roleId: parseInt(form.role),
      ...form,
      createdByIP: "127.0.0.1",
    };
    var apiUrl = "";
    if (isUserEditting) {
      apiUrl = "http://apparels360.in/api/Account/Update";
    } else {
      apiUrl = "http://apparels360.in/api/Account/Save";
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "accept": "*/*" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Saved successfully");
        setForm(initialFormState);
        setShowForm(false);
        setEditingUserId(null);
        fetchUsers();
      } else {
        alert("Failed to save");
      }
    } catch {
      alert("Something went wrong");
    }
  };

  return {
    form,
    showForm,
    users,
    loading,
    handleChange,
    handleAddUserClick,
    handleCancel,
    handleEdit,
    handleDelete,
    addEmployee,
  };
}