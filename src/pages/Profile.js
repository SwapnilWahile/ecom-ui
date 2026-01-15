export default function Profile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="card p-4">
      <h4 className="text-center">My Profile</h4>

      <div className="text-center mb-3">
        {user?.profilePic && (
          <img
            src={user.profilePic}
            alt="Profile"
            className="rounded-circle"
            width="120"
            height="120"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>Contact:</b> {user?.contact}</p>
      <p><b>DOB:</b> {user?.dob}</p>
      <p><b>Address:</b> {user?.address}</p>
      <p><b>Status:</b> {user?.status}</p>
    </div>
  );
}
