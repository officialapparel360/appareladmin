const EmployeeForm = ({ form, onChange, onCancel, onSubmit, loading }) => (
  <div className="form-grid">
    <input name="userName" value={form.userName} onChange={onChange} placeholder="Username" />
    <input name="mobileNo" maxLength={10} value={form.mobileNo} onChange={onChange} placeholder="Mobile Number" />
    <input name="name" value={form.name} onChange={onChange} placeholder="Full Name" />
    <input name="emailId" value={form.emailId} onChange={onChange} placeholder="Email" />
    <div className="form-actions">
      <button className="submit-btn" onClick={onSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      <button className="cancel-btn" onClick={onCancel}>Cancel</button>
    </div>
  </div>
);

export default EmployeeForm;