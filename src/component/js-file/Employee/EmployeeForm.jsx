const EmployeeForm = ({ form, onChange, onCancel, onSubmit, loading }) => (
  <div className="form-grid">
    <input name="userName" value={form.userName} onChange={onChange} placeholder="Username" />
    <input name="mobileNo" maxLength={10} value={form.mobileNo} onChange={onChange} placeholder="Mobile Number" />
    <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Password" />
    <input name="name" value={form.name} onChange={onChange} placeholder="Full Name" />
    <input name="emailId" value={form.emailId} onChange={onChange} placeholder="Email" />
    <input name="adharCardNo" maxLength={12} value={form.adharCardNo} onChange={onChange} placeholder="Aadhar Card Number" />
    <input name="dob" type="date" value={form.dob} onChange={onChange} />
    <input name="role" value={form.role} onChange={onChange} placeholder="Role ID" />
    <div className="form-actions">
      <button className="submit-btn" onClick={onSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      <button className="cancel-btn" onClick={onCancel}>Cancel</button>
    </div>
  </div>
);

export default EmployeeForm;