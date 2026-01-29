import { useState } from "react";
import toast from "react-hot-toast";
import defaultAvatar from "../assets/user.jpg";


export default function ProfileModal({ user, onClose }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/update/${user.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password: password || undefined, // if empty, don't update password
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update profile");
        return;
      }

      toast.success("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.reload();
      onClose();

    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-zinc-900 p-6 rounded-2xl w-[90%] max-w-md text-white relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

        <div className="flex flex-col items-center mb-4">
          <img
            src={defaultAvatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-green-600 mb-4"
          />
        </div>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg bg-black border border-white/20 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg bg-black border border-white/20 text-white"
        />
        <input
          type="password"
          placeholder="Password (leave blank to keep)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-3 rounded-lg bg-black border border-white/20 text-white"
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={submitProfile}
            disabled={loading}
            className={`px-4 py-2 rounded-xl font-semibold ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
