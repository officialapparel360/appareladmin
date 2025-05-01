const EmployeeList = ({ users, loading, onEdit, onDelete }) => {
  if (loading) return <p>Loading...</p>;
  if (users.length === 0) return <p className="no-user">No employee available</p>;

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>S. No.</th>
          <th>Profile Pic</th>
          <th>User Name</th>
          <th>Mobile No</th>
          <th>Name</th>
          <th>Email ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.userID || index}>
            <td>{index + 1}</td>
            <img src={user.profilePicPath} alt="" />
            <td>{user.userName}</td>
            <td>{user.mobileNo}</td>
            <td>{user.name}</td>
            <td>{user.emailId}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;