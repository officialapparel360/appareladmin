import React from "react";
import "../../css-file/UserPage.css";
import { useEmployeePageLogic } from "./useEmployeePageLogic";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";

const EmployeePage = () => {
  const {
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
  } = useEmployeePageLogic();

  return (
    <div className="user-page">
      <div className="user-header">
        <h2>Employee List</h2>
        {!showForm && (
          <button className="add-btn" onClick={handleAddUserClick}>
            ➕ Add Employee
          </button>
        )}
      </div>

      {showForm && (
        <EmployeeForm
          form={form}
          onChange={handleChange}
          onCancel={handleCancel}
          onSubmit={addEmployee}
          loading={loading}
        />
      )}

      <EmployeeList
        users={users}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EmployeePage;