export default function MembershipCard({ plan }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
      <h2 className="text-2xl font-bold">{plan.name}</h2>
      <p className="text-gray-600 mt-2">{plan.duration}</p>
      <p className="text-3xl font-bold mt-4">₹{plan.price}</p>
      <button className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
        Choose Plan
      </button>
    </div>
  );
}
