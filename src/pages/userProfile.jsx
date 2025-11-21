import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
      } catch (error) {
        toast.error("Error fetching user");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // change image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        import.meta.env.VITE_BACKEND_URL+ `/api/users/${user.email}`,
        formData,
        {
          headers: { 
            "Authorization": `Bearer `+token 
          },
        }
      );

      setUser(formData);
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.log(error);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="pt-[120px] text-center text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className={`pb-4 px-6 md:px-16 max-w-3xl mx-auto ${user.role==='Admin'?"pt-15 ":"pt-[120px]"}`} >
      <div className={`bg-white shadow-xl rounded-2xl p-8 items-center border border-gray-100
        ${user.role === "Admin" && editing ? "flex -ml-48 px-15 w-[1000px] " : "flex flex-col"}`} >
        
        <div className={`${user.role === "Admin" && editing ? "flex flex-col space-y-3 w-[500px]" : "flex flex-col items-center"}`}>
          <div className="relative group" >
            <img
              src={formData.profileImage || "/icon.png"}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md border-4 border-acsent"
            />

            {editing && (
              <label className={`absolute bg-acsent text-white p-2 rounded-full 
                cursor-pointer hover:bg-acsent/90 transition shadow-lg ${user.role==="Admin"?"bottom-2 left-30":"bottom-2 right-2"}`} >
                <BiEdit size={18} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        
          <h2 className="text-3xl font-bold text-acsent mt-4">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-gray-600 mt-1">{user.email}</p>
          <p className="text-gray-600 mt-1">{user.phone}</p>
          <p className="text-gray-600 mt-1">{user.address}</p>
        </div>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="mt-6 flex items-center gap-2 px-6 py-2 bg-acsent text-white font-semibold rounded-lg hover:bg-acsent/90 transition"
          >
            <BiEdit size={18} /> Edit Profile
          </button>
        )}

        {editing && (
          <div className="mt-6 w-full space-y-4" >

            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acsent"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acsent"
            />

            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acsent"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acsent"
            />

            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acsent"
            />

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-acsent text-white font-semibold rounded-lg hover:bg-acsent/90 transition"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
