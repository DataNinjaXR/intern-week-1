import { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  Wrench,
  Users,
  BarChart3,
  LogOut,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Menu,
  X,
  Search,
  MapPin,
  UsersRound,
  AlertCircle,
  Edit2,
  Trash2,
  RefreshCw,
} from "lucide-react";

const API = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =========================
   HELPER COMPONENTS
========================= */

function Loading() {
  return (
    <div className="flex items-center justify-center p-20 text-slate-500">
      <div className="flex items-center gap-3">
        <RefreshCw size={20} className="animate-spin" />
        Loading...
      </div>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
      <AlertCircle size={20} />
      <span>{message}</span>
    </div>
  );
}

function EmptyState({ message = "No records found." }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-slate-400">
      <Building2 size={40} className="mb-3 opacity-40" />
      <p>{message}</p>
    </div>
  );
}

/* =========================
   STATUS BADGE
========================= */

function Status({ status }) {
  const styles = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    CANCELLED: "bg-slate-100 text-slate-600",
    COMPLETED: "bg-blue-100 text-blue-700",
    AVAILABLE: "bg-green-100 text-green-700",
    UNDER_MAINTENANCE: "bg-yellow-100 text-yellow-700",
    INACTIVE: "bg-red-100 text-red-700",
    SCHEDULED: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-orange-100 text-orange-700",
    ACTIVE: "bg-green-100 text-green-700",
    LOW: "bg-slate-100 text-slate-600",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-red-100 text-red-700",
  };

  return (
    <span className={`badge ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status?.replace(/_/g, " ")}
    </span>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({ title, value, icon: Icon, color = "blue" }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    slate: "bg-slate-50 text-slate-600",
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-3xl font-bold mt-2">{value ?? "—"}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

/* =========================
   LOGIN
========================= */

function Login({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onLogin(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/register", { name, email, password, role, department });
      setSuccess("Registration successful! Please login.");
      setMode("login");
      setName("");
      setDepartment("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center">
            <Building2 size={30} />
          </div>
          <h1 className="text-2xl font-bold mt-4">Campus Facilities</h1>
          <p className="text-slate-500 mt-1">Facility Management System</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
            <CheckCircle size={16} />
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
              mode === "login"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setMode("register"); setError(""); }}
            className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
              mode === "register"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Register
          </button>
        </div>

        {mode === "login" ? (
          <form onSubmit={submitLogin} className="space-y-4">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn-primary w-full">Login</button>
          </form>
        ) : (
          <form onSubmit={submitRegister} className="space-y-4">
            <input
              className="input"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
            </select>
            <input
              className="input"
              type="text"
              placeholder="Department (optional)"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <button className="btn-primary w-full">Create Account</button>
          </form>
        )}

        <div className="mt-6 text-sm text-slate-500 text-center">
          Demo accounts:
          <br />
          admin@campus.com / Admin@123
          <br />
          student@campus.com / Student@123
          <br />
          faculty@campus.com / Faculty@123
        </div>
      </div>
    </div>
  );
}

/* =========================
   LAYOUT
========================= */

function Layout({ user, page, setPage, logout, children }) {
  const [mobile, setMobile] = useState(false);

  const userItems = [
    ["dashboard", "Dashboard", LayoutDashboard],
    ["facilities", "Facilities", Building2],
    ["bookings", "My Bookings", CalendarDays],
  ];

  const adminItems = [
    ["dashboard", "Dashboard", LayoutDashboard],
    ["facilities", "Facilities", Building2],
    ["bookings", "Bookings", CalendarDays],
    ["maintenance", "Maintenance", Wrench],
    ["users", "Users", Users],
    ["reports", "Reports", BarChart3],
  ];

  const items = user.role === "ADMIN" ? adminItems : userItems;

  const pageLabel =
    items.find(([key]) => key === page)?.[1] ||
    page.charAt(0).toUpperCase() + page.slice(1);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {mobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobile(false)}
        />
      )}

      <aside
        className={`fixed lg:static z-50 h-screen w-64 bg-slate-950 text-white flex flex-col ${
          mobile ? "left-0" : "-left-64 lg:left-0"
        }`}
        style={{ transition: "left 0.2s" }}
      >
        <div className="p-5 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Building2 size={22} />
              <span className="font-bold text-lg">CampusFM</span>
            </div>
            <button className="lg:hidden" onClick={() => setMobile(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="mb-6 p-3 bg-white/10 rounded-xl">
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-xs text-slate-400 mt-1">{user.role}</p>
            {user.department && (
              <p className="text-xs text-slate-500 mt-0.5 truncate">{user.department}</p>
            )}
          </div>

          <nav className="space-y-1">
            {items.map(([key, label, Icon]) => (
              <button
                key={key}
                onClick={() => {
                  setPage(key);
                  setMobile(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  page === key
                    ? "bg-blue-600 text-white"
                    : "hover:bg-white/10 text-slate-300"
                }`}
              >
                <Icon size={19} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-5 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-slate-300 transition-colors"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center px-6 shadow-sm sticky top-0 z-30">
          <button className="lg:hidden mr-4" onClick={() => setMobile(true)}>
            <Menu size={22} />
          </button>
          <h2 className="font-semibold text-slate-800">{pageLabel}</h2>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}

/* =========================
   FACILITY CARD
========================= */

function FacilityCard({ facility }) {
  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Building2 size={20} />
        </div>
        <Status status={facility.status} />
      </div>

      <h3 className="font-semibold">{facility.name}</h3>
      <p className="text-sm text-slate-500 mt-1">{facility.type}</p>

      <div className="mt-3 text-sm text-slate-500 space-y-1">
        <p className="flex items-center gap-2">
          <MapPin size={14} />
          {facility.location}
        </p>
        <p className="flex items-center gap-2">
          <UsersRound size={14} />
          Capacity: {facility.capacity}
        </p>
      </div>
    </div>
  );
}

/* =========================
   USER DASHBOARD
========================= */

function UserDashboard({ user }) {
  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");
      try {
        const [facilityRes, bookingRes] = await Promise.all([
          api.get("/facilities"),
          api.get(`/bookings/user/${user.id}`),
        ]);

        if (!active) return;

        setFacilities(facilityRes.data);
        setBookings(bookingRes.data);
      } catch (err) {
        if (active) setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDashboard();

    return () => { active = false; };
  }, [user.id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  const pending = bookings.filter((b) => b.status === "PENDING");
  const approved = bookings.filter((b) => b.status === "APPROVED");
  const available = facilities.filter((f) => f.status === "AVAILABLE");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <p className="text-slate-500">Manage your campus facility bookings.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Available Facilities" value={available.length} icon={Building2} color="blue" />
        <StatCard title="My Bookings" value={bookings.length} icon={CalendarDays} color="purple" />
        <StatCard title="Pending" value={pending.length} icon={Clock} color="yellow" />
        <StatCard title="Approved" value={approved.length} icon={CheckCircle} color="green" />
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h2 className="font-semibold text-lg mb-4">Available Facilities</h2>
        {available.length === 0 ? (
          <EmptyState message="No available facilities at the moment." />
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {available.slice(0, 6).map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        )}
      </div>

      {bookings.filter((b) => ["PENDING", "APPROVED"].includes(b.status)).length > 0 && (
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="font-semibold text-lg mb-4">Upcoming Bookings</h2>
          <div className="space-y-3">
            {bookings
              .filter((b) => ["PENDING", "APPROVED"].includes(b.status))
              .slice(0, 3)
              .map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium">{booking.facility_name}</p>
                    <p className="text-sm text-slate-500">
                      {String(booking.booking_date).slice(0, 10)} · {booking.start_time} – {booking.end_time}
                    </p>
                  </div>
                  <Status status={booking.status} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   FACILITIES (USER)
========================= */

function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadFacilities = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/facilities");
        if (active) setFacilities(response.data);
      } catch (err) {
        if (active) setError(err.response?.data?.message || "Failed to load facilities");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadFacilities();

    return () => { active = false; };
  }, []);

  const filtered = facilities.filter(
    (f) =>
      `${f.name} ${f.type} ${f.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (selected) {
    return (
      <FacilityDetails
        facility={selected}
        onBack={() => setSelected(null)}
      />
    );
  }

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Facilities</h1>
          <p className="text-slate-500">Browse and book campus facilities.</p>
        </div>

        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          <input
            className="input pl-10 min-w-60"
            placeholder="Search facilities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      {filtered.length === 0 ? (
        <EmptyState message="No facilities match your search." />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((facility) => (
            <div
              key={facility.id}
              onClick={() => setSelected(facility)}
              className="cursor-pointer"
            >
              <FacilityCard facility={facility} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================
   FACILITY DETAILS
========================= */

function FacilityDetails({ facility, onBack }) {
  const [date, setDate] = useState("");
  const [availability, setAvailability] = useState([]);
  const [availLoading, setAvailLoading] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingMsg, setBookingMsg] = useState("");
  const [bookingError, setBookingError] = useState("");

  const [form, setForm] = useState({
    start_time: "",
    end_time: "",
    purpose: "",
  });

  useEffect(() => {
    let active = true;

    if (!date) return;

    const loadAvailability = async () => {
      setAvailLoading(true);
      try {
        const response = await api.get(
          `/facilities/${facility.id}/availability?date=${date}`
        );
        if (active) setAvailability(response.data.bookings);
      } catch {
        if (active) setAvailability([]);
      } finally {
        if (active) setAvailLoading(false);
      }
    };

    loadAvailability();

    return () => { active = false; };
  }, [date, facility.id]);

  const book = async (e) => {
    e.preventDefault();
    setBookingMsg("");
    setBookingError("");

    try {
      await api.post("/bookings", {
        facility_id: facility.id,
        booking_date: date,
        ...form,
      });

      setBookingMsg("Booking request submitted successfully!");
      setShowBooking(false);
      setForm({ start_time: "", end_time: "", purpose: "" });

      // Refresh availability
      const response = await api.get(
        `/facilities/${facility.id}/availability?date=${date}`
      );
      setAvailability(response.data.bookings);
    } catch (err) {
      setBookingError(err.response?.data?.message || "Booking failed");
    }
  };

  const canBook = facility.status === "AVAILABLE";

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="text-blue-600 font-medium hover:underline flex items-center gap-1"
      >
        ← Back to facilities
      </button>

      {bookingMsg && (
        <div className="bg-green-50 text-green-700 p-3 rounded-xl flex items-center gap-2">
          <CheckCircle size={18} />
          {bookingMsg}
        </div>
      )}

      <div className="bg-white rounded-2xl border p-6">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{facility.name}</h1>
            <p className="text-slate-500 mt-1">{facility.type}</p>

            <div className="mt-4 space-y-2 text-slate-600">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-slate-400" />
                {facility.location}
              </p>
              <p className="flex items-center gap-2">
                <UsersRound size={16} className="text-slate-400" />
                Capacity: {facility.capacity}
              </p>
              {facility.equipment && (
                <p className="flex items-center gap-2">
                  <Wrench size={16} className="text-slate-400" />
                  {facility.equipment}
                </p>
              )}
            </div>

            {facility.description && (
              <p className="mt-4 text-slate-600">{facility.description}</p>
            )}
          </div>

          <div>
            <Status status={facility.status} />
            {!canBook && (
              <p className="text-sm text-slate-500 mt-2 max-w-xs">
                This facility is not available for booking.
              </p>
            )}
          </div>
        </div>

        <hr className="my-6" />

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div>
            <label className="text-sm text-slate-500 block mb-1">Select Date</label>
            <input
              type="date"
              className="input"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setBookingMsg("");
                setBookingError("");
              }}
            />
          </div>

          {canBook && date && (
            <button
              className="btn-primary mt-5 md:mt-auto"
              onClick={() => { setShowBooking(true); setBookingError(""); }}
            >
              <Plus size={18} />
              Request Booking
            </button>
          )}
        </div>

        {date && (
          <div className="mt-5">
            <h3 className="font-semibold mb-3">Booked Slots on {date}</h3>
            {availLoading ? (
              <Loading />
            ) : availability.length === 0 ? (
              <p className="text-green-600 text-sm">✓ No bookings — facility is available on this date.</p>
            ) : (
              <div className="space-y-2">
                {availability.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border"
                  >
                    <div>
                      <span className="font-medium">
                        {booking.start_time} – {booking.end_time}
                      </span>
                      {booking.purpose && (
                        <span className="text-slate-500 ml-2 text-sm">· {booking.purpose}</span>
                      )}
                    </div>
                    <Status status={booking.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showBooking && (
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Request Booking for {date}</h2>

          {bookingError && <ErrorMessage message={bookingError} />}

          <form onSubmit={book} className="grid md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="text-sm text-slate-500 block mb-1">Start Time</label>
              <input
                className="input"
                type="time"
                value={form.start_time}
                onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-500 block mb-1">End Time</label>
              <input
                className="input"
                type="time"
                value={form.end_time}
                onChange={(e) => setForm({ ...form, end_time: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-sm text-slate-500 block mb-1">Purpose</label>
              <input
                className="input"
                placeholder="e.g. Lab session, Meeting"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                required
              />
            </div>

            <div className="md:col-span-3 flex gap-3">
              <button className="btn-primary">Submit Request</button>
              <button
                type="button"
                onClick={() => { setShowBooking(false); setBookingError(""); }}
                className="px-4 py-2 border rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* =========================
   MY BOOKINGS
========================= */

function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    try {
      const response = await api.get(`/bookings/user/${user.id}`);
      setBookings(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load bookings");
    }
  };

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/bookings/user/${user.id}`);
        if (active) setBookings(response.data);
      } catch (err) {
        if (active) setError(err.response?.data?.message || "Failed to load bookings");
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => { active = false; };
  }, [user.id]);

  const cancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await api.put(`/bookings/${id}/cancel`);
      await loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to cancel");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <p className="text-slate-500">Track your facility booking requests.</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="bg-white rounded-2xl border overflow-hidden">
        {bookings.length === 0 ? (
          <EmptyState message="You have no bookings yet." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="table-head">Facility</th>
                  <th className="table-head">Date</th>
                  <th className="table-head">Time</th>
                  <th className="table-head">Purpose</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t hover:bg-slate-50">
                    <td className="table-cell font-medium">{booking.facility_name}</td>
                    <td className="table-cell">{String(booking.booking_date).slice(0, 10)}</td>
                    <td className="table-cell">
                      {booking.start_time} – {booking.end_time}
                    </td>
                    <td className="table-cell">{booking.purpose}</td>
                    <td className="table-cell">
                      <Status status={booking.status} />
                    </td>
                    <td className="table-cell">
                      {["PENDING", "APPROVED"].includes(booking.status) && (
                        <button
                          onClick={() => cancel(booking.id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   ADMIN DASHBOARD
========================= */

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/admin/dashboard");
        if (active) setData(response.data);
      } catch (err) {
        if (active) setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDashboard();

    return () => { active = false; };
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  const s = data.statistics;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-500">Campus facility management overview.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Users" value={s.users} icon={Users} color="blue" />
        <StatCard title="Facilities" value={s.facilities} icon={Building2} color="blue" />
        <StatCard title="Total Bookings" value={s.bookings} icon={CalendarDays} color="purple" />
        <StatCard title="Pending" value={s.pendingBookings} icon={Clock} color="yellow" />
        <StatCard title="Approved" value={s.approvedBookings} icon={CheckCircle} color="green" />
        <StatCard title="Maintenance" value={s.activeMaintenance} icon={Wrench} color="red" />
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h2 className="font-semibold text-lg mb-4">Most Booked Facilities</h2>
        {data.popularFacilities.length === 0 ? (
          <EmptyState message="No booking data yet." />
        ) : (
          <div className="space-y-3">
            {data.popularFacilities.map((facility) => (
              <div
                key={facility.id}
                className="flex justify-between items-center p-3 bg-slate-50 rounded-xl"
              >
                <span className="font-medium">{facility.name}</span>
                <span className="text-sm text-slate-500">
                  {facility.booking_count} booking{facility.booking_count !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   ADMIN BOOKINGS
========================= */

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  const loadBookings = async () => {
    try {
      const response = await api.get("/bookings");
      setBookings(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load bookings");
    }
  };

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/bookings");
        if (active) setBookings(response.data);
      } catch (err) {
        if (active) setError(err.response?.data?.message || "Failed to load bookings");
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => { active = false; };
  }, []);

  const action = async (id, type) => {
    try {
      await api.put(`/bookings/${id}/${type}`);
      await loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  const filtered =
    filter === "ALL"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <p className="text-slate-500">Review and manage all booking requests.</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="flex gap-2 flex-wrap">
        {["ALL", "PENDING", "APPROVED", "REJECTED", "CANCELLED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filter === s
                ? "bg-blue-600 text-white border-blue-600"
                : "border-slate-200 hover:bg-slate-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState message="No bookings found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="table-head">User</th>
                  <th className="table-head">Facility</th>
                  <th className="table-head">Date</th>
                  <th className="table-head">Time</th>
                  <th className="table-head">Purpose</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id} className="border-t hover:bg-slate-50">
                    <td className="table-cell">
                      <div>
                        <p className="font-medium">{booking.user_name}</p>
                        <p className="text-xs text-slate-400">{booking.user_role}</p>
                      </div>
                    </td>
                    <td className="table-cell">{booking.facility_name}</td>
                    <td className="table-cell">{String(booking.booking_date).slice(0, 10)}</td>
                    <td className="table-cell">
                      {booking.start_time} – {booking.end_time}
                    </td>
                    <td className="table-cell">{booking.purpose}</td>
                    <td className="table-cell">
                      <Status status={booking.status} />
                    </td>
                    <td className="table-cell">
                      {booking.status === "PENDING" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => action(booking.id, "approve")}
                            className="text-green-600 hover:text-green-800"
                            title="Approve"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() => action(booking.id, "reject")}
                            className="text-red-600 hover:text-red-800"
                            title="Reject"
                          >
                            <XCircle size={20} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   ADMIN FACILITIES
========================= */

function AdminFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    type: "Classroom",
    location: "",
    capacity: "",
    description: "",
    equipment: "",
    status: "AVAILABLE",
  };

  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    try {
      const response = await api.get("/facilities");
      setFacilities(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load facilities");
    }
  };

  useEffect(() => {
    let active = true;

    const init = async () => {
      setLoading(true);
      await load();
      if (active) setLoading(false);
    };

    init();

    return () => { active = false; };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/facilities/${editingId}`, form);
      } else {
        await api.post("/facilities", form);
      }

      setForm(emptyForm);
      setShowForm(false);
      setEditingId(null);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  const startEdit = (facility) => {
    setForm({
      name: facility.name,
      type: facility.type,
      location: facility.location,
      capacity: facility.capacity,
      description: facility.description || "",
      equipment: facility.equipment || "",
      status: facility.status,
    });
    setEditingId(facility.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this facility?")) return;
    try {
      await api.delete(`/facilities/${id}`);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Cannot delete facility");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Facilities</h1>
          <p className="text-slate-500">Manage campus facilities.</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setShowForm(!showForm);
          }}
        >
          <Plus size={18} />
          Add Facility
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {showForm && (
        <form
          onSubmit={submit}
          className="bg-white border rounded-2xl p-6 grid md:grid-cols-2 gap-4"
        >
          <h2 className="md:col-span-2 font-semibold text-lg">
            {editingId ? "Edit Facility" : "Add New Facility"}
          </h2>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Name *</label>
            <input
              className="input"
              placeholder="Facility name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Type *</label>
            <select
              className="input"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
            >
              <option>Classroom</option>
              <option>Computer Lab</option>
              <option>Seminar Hall</option>
              <option>Auditorium</option>
              <option>Conference Room</option>
              <option>Sports Facility</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Location *</label>
            <input
              className="input"
              placeholder="Building / Floor"
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Capacity *</label>
            <input
              className="input"
              type="number"
              placeholder="Max persons"
              required
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Status</label>
            <select
              className="input"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Equipment</label>
            <input
              className="input"
              placeholder="e.g. Projector, AC"
              value={form.equipment}
              onChange={(e) => setForm({ ...form, equipment: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-slate-500 block mb-1">Description</label>
            <textarea
              className="input"
              rows={3}
              placeholder="Brief description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button className="btn-primary">
              {editingId ? "Update Facility" : "Create Facility"}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
              className="px-4 py-2 border rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {facilities.length === 0 ? (
        <EmptyState message="No facilities found." />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {facilities.map((facility) => (
            <div key={facility.id} className="bg-white border rounded-2xl p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{facility.name}</h3>
                <Status status={facility.status} />
              </div>

              <p className="text-sm text-slate-500">{facility.type}</p>
              <p className="text-sm text-slate-600 mt-2">
                <MapPin size={13} className="inline mr-1" />
                {facility.location}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                <UsersRound size={13} className="inline mr-1" />
                Capacity: {facility.capacity}
              </p>
              {facility.equipment && (
                <p className="text-xs text-slate-400 mt-2 truncate">{facility.equipment}</p>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => startEdit(facility)}
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => remove(facility.id)}
                  className="flex items-center gap-1 text-red-600 hover:underline text-sm"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================
   ADMIN MAINTENANCE
========================= */

function AdminMaintenance() {
  const [items, setItems] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const emptyForm = {
    facility_id: "",
    issue: "",
    priority: "MEDIUM",
    start_date: "",
    expected_completion: "",
    description: "",
    status: "SCHEDULED",
  };

  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    try {
      const [maintenanceRes, facilityRes] = await Promise.all([
        api.get("/maintenance"),
        api.get("/facilities"),
      ]);
      setItems(maintenanceRes.data);
      setFacilities(facilityRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load maintenance records");
    }
  };

  useEffect(() => {
    let active = true;

    const init = async () => {
      setLoading(true);
      await load();
      if (active) setLoading(false);
    };

    init();

    return () => { active = false; };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/maintenance", form);
      setForm(emptyForm);
      setShowForm(false);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create maintenance record");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const item = items.find((i) => i.id === id);
      if (!item) return;

      await api.put(`/maintenance/${id}`, {
        issue: item.issue,
        priority: item.priority,
        start_date: String(item.start_date).slice(0, 10),
        expected_completion: item.expected_completion
          ? String(item.expected_completion).slice(0, 10)
          : null,
        description: item.description,
        status,
      });

      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this maintenance record?")) return;
    try {
      await api.delete(`/maintenance/${id}`);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Maintenance</h1>
          <p className="text-slate-500">Track facility maintenance records.</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          Add Record
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {showForm && (
        <form
          onSubmit={submit}
          className="bg-white border rounded-2xl p-6 grid md:grid-cols-3 gap-4"
        >
          <h2 className="md:col-span-3 font-semibold text-lg">New Maintenance Record</h2>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Facility *</label>
            <select
              className="input"
              required
              value={form.facility_id}
              onChange={(e) => setForm({ ...form, facility_id: e.target.value })}
            >
              <option value="">Select facility</option>
              {facilities.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Issue *</label>
            <input
              className="input"
              placeholder="Brief description of issue"
              required
              value={form.issue}
              onChange={(e) => setForm({ ...form, issue: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Priority</label>
            <select
              className="input"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Start Date *</label>
            <input
              className="input"
              type="date"
              required
              value={form.start_date}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Expected Completion</label>
            <input
              className="input"
              type="date"
              value={form.expected_completion}
              onChange={(e) => setForm({ ...form, expected_completion: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-slate-500 block mb-1">Initial Status</label>
            <select
              className="input"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="SCHEDULED">SCHEDULED</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="text-sm text-slate-500 block mb-1">Description</label>
            <textarea
              className="input"
              rows={2}
              placeholder="Additional details"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="md:col-span-3 flex gap-3">
            <button className="btn-primary">Add Maintenance</button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border rounded-2xl overflow-hidden">
        {items.length === 0 ? (
          <EmptyState message="No maintenance records found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="table-head">Facility</th>
                  <th className="table-head">Issue</th>
                  <th className="table-head">Priority</th>
                  <th className="table-head">Start</th>
                  <th className="table-head">Expected</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-slate-50">
                    <td className="table-cell font-medium">
                      {item.facility_name || item.facility_id}
                    </td>
                    <td className="table-cell">{item.issue}</td>
                    <td className="table-cell">
                      <Status status={item.priority} />
                    </td>
                    <td className="table-cell">{String(item.start_date).slice(0, 10)}</td>
                    <td className="table-cell">
                      {item.expected_completion
                        ? String(item.expected_completion).slice(0, 10)
                        : "—"}
                    </td>
                    <td className="table-cell">
                      <Status status={item.status} />
                    </td>
                    <td className="table-cell">
                      <div className="flex gap-2 flex-wrap">
                        {item.status === "SCHEDULED" && (
                          <button
                            onClick={() => updateStatus(item.id, "IN_PROGRESS")}
                            className="text-orange-600 hover:underline text-xs"
                          >
                            Start
                          </button>
                        )}
                        {item.status !== "COMPLETED" && (
                          <button
                            onClick={() => updateStatus(item.id, "COMPLETED")}
                            className="text-green-600 hover:underline text-xs"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => remove(item.id)}
                          className="text-red-600 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   ADMIN USERS
========================= */

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    }
  };

  useEffect(() => {
    let active = true;

    const init = async () => {
      setLoading(true);
      await load();
      if (active) setLoading(false);
    };

    init();

    return () => { active = false; };
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await api.put(`/admin/users/${id}/status`, { status });
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-slate-500">Manage campus users and accounts.</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="bg-white border rounded-2xl overflow-hidden">
        {users.length === 0 ? (
          <EmptyState message="No users found." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="table-head">Name</th>
                  <th className="table-head">Email</th>
                  <th className="table-head">Role</th>
                  <th className="table-head">Department</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-slate-50">
                    <td className="table-cell font-medium">{u.name}</td>
                    <td className="table-cell">{u.email}</td>
                    <td className="table-cell">
                      <span className="badge bg-slate-100 text-slate-700">{u.role}</span>
                    </td>
                    <td className="table-cell">{u.department || "—"}</td>
                    <td className="table-cell">
                      <Status status={u.status} />
                    </td>
                    <td className="table-cell">
                      {u.role !== "ADMIN" && (
                        <button
                          className={`text-sm font-medium ${
                            u.status === "ACTIVE"
                              ? "text-red-600 hover:underline"
                              : "text-green-600 hover:underline"
                          }`}
                          onClick={() =>
                            changeStatus(
                              u.id,
                              u.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                            )
                          }
                        >
                          {u.status === "ACTIVE" ? "Deactivate" : "Activate"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   REPORTS
========================= */

function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadReports = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/admin/dashboard");
        if (active) setData(response.data);
      } catch (err) {
        if (active) setError(err.response?.data?.message || "Failed to load reports");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadReports();

    return () => { active = false; };
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  const s = data.statistics;
  const maxBookings = Math.max(
    ...data.popularFacilities.map((f) => f.booking_count),
    1
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-slate-500">Booking and usage statistics.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Bookings" value={s.bookings} icon={BarChart3} color="blue" />
        <StatCard title="Approved" value={s.approvedBookings} icon={CheckCircle} color="green" />
        <StatCard title="Pending" value={s.pendingBookings} icon={Clock} color="yellow" />
        <StatCard title="Cancelled" value={s.cancelledBookings} icon={XCircle} color="red" />
      </div>

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="font-semibold text-lg mb-5">Facility Usage</h2>
        {data.popularFacilities.length === 0 ? (
          <EmptyState message="No booking data yet." />
        ) : (
          <div className="space-y-4">
            {data.popularFacilities.map((facility) => (
              <div key={facility.id}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{facility.name}</span>
                  <span className="text-slate-500">
                    {facility.booking_count} booking{facility.booking_count !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{
                      width: `${(facility.booking_count / maxBookings) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================
   APP
========================= */

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [page, setPage] = useState("dashboard");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setPage("dashboard");
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  let content = null;

  if (user.role === "ADMIN") {
    if (page === "dashboard") content = <AdminDashboard />;
    else if (page === "facilities") content = <AdminFacilities />;
    else if (page === "bookings") content = <AdminBookings />;
    else if (page === "maintenance") content = <AdminMaintenance />;
    else if (page === "users") content = <AdminUsers />;
    else if (page === "reports") content = <Reports />;
  } else {
    if (page === "dashboard") content = <UserDashboard user={user} />;
    else if (page === "facilities") content = <Facilities />;
    else if (page === "bookings") content = <MyBookings user={user} />;
  }

  return (
    <Layout user={user} page={page} setPage={setPage} logout={logout}>
      {content}
    </Layout>
  );
}

export default App;