import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "../../css-file/CustomerList.css"; // ✅ Import the external CSS

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://apparels360.in/api/Account/GetAllCustomer")
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "success") {
          setCustomers(data.data);
        }
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  useEffect(() => {
    fetch("http://apparels360.in/api/Account/GetAll")
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "success") {
          setEmployees(data.data);
        }
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleAssignAdmin = (customerUserId, employeeUserId) => {
    if (employeeUserId === "") return;
  
    const confirmAssign = window.confirm(
      "Are you sure you want to assign this admin to the customer?"
    );
  
    if (!confirmAssign) return;
  
    fetch("http://apparels360.in/api/Account/UserMapping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeUserId: employeeUserId,
        customerUserId: customerUserId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "success") {
          toast.success("Admin assigned successfully!");
        } else {
          toast.error("Failed to assign admin.");
        }
      })
      .catch(() => {
        toast.error("An error occurred while assigning admin.");
      });
  };
  

  const handleDelete = (userID) => {
    const confirmDelete = window.confirm(
      "⚠️ Warning:\n\nOnce this customer is deleted, all associated data will be permanently lost and cannot be recovered.\n\nAre you sure you want to delete this customer?"
    );
    if (confirmDelete) {
      console.log("Deleting customer:", userID);
    }
  };

  return (
    <div className="customer-container">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="customer-heading">Mobile Customers</h1>
      {customers.length === 0 ? (
        <p className="customer-empty">No customers found.</p>
      ) : (
        <div className="customer-grid">
          {customers.map((customer) => (
            <div key={customer.userID} className="customer-card">
              <div className="customer-profile">
                <img
                  src={
                    customer.profilePicPath ||
                    `https://ui-avatars.com/api/?name=${customer.userName || "C"}`
                  }
                  alt="Profile"
                  className="profile-pic"
                />
                <div>
                  <p className="customer-username">{customer.userName || "-"}</p>
                  <p className="customer-name">{customer.name || "-"}</p>
                  <p className="customer-mobile">{customer.mobileNo}</p>
                </div>
              </div>

              <div className="customer-assign">
                <label className="assign-label">Assign Admin</label>
                <select
                  className="assign-select"
                  defaultValue=""
                  onChange={(e) =>
                    handleAssignAdmin(customer.userID, e.target.value)
                  }
                >
                  <option value="">None</option>
                  {employees.map((emp) => (
                    <option key={emp.userID} value={emp.userID}>
                      {emp.name || emp.userName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="customer-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(customer.userID)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
