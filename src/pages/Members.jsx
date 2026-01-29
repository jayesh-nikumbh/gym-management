import { useState } from "react";
import { motion } from "framer-motion";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    feesPaid: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addMember = (e) => {
    e.preventDefault();
    setMembers([...members, { ...form, id: Date.now(), attendance: [] }]);
    setForm({ name: "", email: "", phone: "", feesPaid: false });
  };

  const deleteMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Members Management</h1>

      {/* ADD MEMBER */}
      <motion.form
        onSubmit={addMember}
        className="bg-white p-6 rounded-xl shadow-md grid md:grid-cols-5 gap-4 mb-8"
      >
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" required />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="feesPaid" checked={form.feesPaid} onChange={handleChange} />
          Fees Paid
        </label>

        <button className="bg-black text-white rounded hover:bg-gray-800">
          Add
        </button>
      </motion.form>

      {/* MEMBERS TABLE */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Fees</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.email}</td>
                <td className="p-3">{m.phone}</td>
                <td className="p-3">
                  {m.feesPaid ? "Paid ✅" : "Pending ❌"}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => deleteMember(m.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No members added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
