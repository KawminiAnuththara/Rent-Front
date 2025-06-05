import {
  GoGraph
} from "react-icons/go";
import {
  FaQuestionCircle,
  FaRegBookmark,
  FaRegUser
} from "react-icons/fa";
import {
  MdOutlineAudiotrack
} from "react-icons/md";
import {
  FaStarHalfStroke
} from "react-icons/fa6";
import {
  Link,
  Route,
  Routes
} from "react-router-dom";
import {
  useEffect,
  useState
} from "react";
import axios from "axios";
import AdminItemPage from "./AdminItemPage";
import AddItemsPage from "./AddItemPage";
import UpdateItemPage from "./UpdateItemPage";
import AdminUsersPage from "./AdminUsersPage";
import AdminBookingPage from "./AdminBookingPage";
import AdminReviewPage from "./AdminReviewPage";
import AdminInquiryPage from "./AdminInquiryPage";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const user = res.data;
      if (user.role === "admin") {
        setUserValidated(true);
      } else {
        window.location.href = "/";
      }
    }).catch((err) => {
      console.error(err);
      setUserValidated(false);
    });
  }, []);

  const navItems = [
    { icon: <GoGraph />, label: "Dashboard", path: "/admin" },
    { icon: <FaRegBookmark />, label: "Bookings", path: "/admin/booking" },
    { icon: <MdOutlineAudiotrack />, label: "Items", path: "/admin/items" },
    { icon: <FaRegUser />, label: "Users", path: "/admin/users" },
    { icon: <FaStarHalfStroke />, label: "Reviews", path: "/admin/review" },
    { icon: <FaQuestionCircle />, label: "Inquiries", path: "/admin/inquiries" }
  ];

  return (
    <div className="w-full h-screen flex ">
      {/* Sidebar */}
      <div className="w-[250px] h-full bg-danger text-white border-r shadow-md p-4 flex flex-col space-y-4 ">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-3 text-lg font-semibold text-white px-4 py-3 rounded-lg hover:bg-accent hover:text-white transition-all duration-200"
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full p-6 overflow-auto">
        {userValidated && (
          <Routes>
            <Route path="/booking" element={<AdminBookingPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/items" element={<AdminItemPage />} />
            <Route path="/item/add" element={<AddItemsPage />} />
            <Route path="/item/edit" element={<UpdateItemPage />} />
            <Route path="/review" element={<AdminReviewPage />} />
            <Route path="/inquiries" element={<AdminInquiryPage />} />
          </Routes>
        )}
      </div>
    </div>
  );
}
