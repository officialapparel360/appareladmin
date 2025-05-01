import { useState, useEffect } from "react";

const initialFormState = {
  userName: "",
  mobileNo: "",
  name: "",
  emailId: "",
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
    const { name, value } = e.target;
    if (
      name === "userID" ||
      name === "roleId" ||
      name === "userName" ||
      name === "mobileNo" ||
      name === "name" ||
      name === "emailId" ||
      name === "id"
    ) {
      setForm({ ...form, [name]: value });
    }
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
    if (!window.confirm("⚠️ Warning: Are you sure you want to delete this Employee?")) return;

        try {
            await fetch("http://apparels360.in/api/Account/Delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: userID
                })
            });
            fetchUsers();
        } catch (err) {
            console.error("Delete failed", err);
        }
  };

  const validateForm = () => {
    const errors = [];
    if (!form.userName) errors.push("Username is required");
    if (!/^\d{10}$/.test(form.mobileNo)) errors.push("Mobile must be 10 digits");
    if (!form.name) errors.push("Name is required");
    if (!form.emailId || !/^\S+@\S+\.\S+$/.test(form.emailId)) errors.push("Email is invalid");
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
      roleID: parseInt(form.roleID),
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
        setisUserEditting(false)
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