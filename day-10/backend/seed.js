const bcrypt = require("bcryptjs");
const db = require("./config/db");

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // Clear existing data
    await db.query("SET FOREIGN_KEY_CHECKS = 0");

    await db.query("TRUNCATE TABLE bookings");
    await db.query("TRUNCATE TABLE maintenance");
    await db.query("TRUNCATE TABLE facilities");
    await db.query("TRUNCATE TABLE users");

    await db.query("SET FOREIGN_KEY_CHECKS = 1");

    // Passwords
    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const studentPassword = await bcrypt.hash("Student@123", 10);
    const facultyPassword = await bcrypt.hash("Faculty@123", 10);

    // Users
    await db.query(
      `INSERT INTO users
       (name, email, password, role, department)
       VALUES
       (?, ?, ?, 'ADMIN', ?),
       (?, ?, ?, 'STUDENT', ?),
       (?, ?, ?, 'FACULTY', ?),
       (?, ?, ?, 'STUDENT', ?)`,
      [
        "System Administrator",
        "admin@campus.com",
        adminPassword,
        "Administration",

        "Rafey Student",
        "student@campus.com",
        studentPassword,
        "Computer Science",

        "Dr. Faculty",
        "faculty@campus.com",
        facultyPassword,
        "Computer Science",

        "Test Student",
        "test@campus.com",
        studentPassword,
        "Information Technology",
      ]
    );

    // Facilities
    await db.query(
      `INSERT INTO facilities
       (name, type, location, capacity, description, status, equipment)
       VALUES
       (?, ?, ?, ?, ?, ?, ?),
       (?, ?, ?, ?, ?, ?, ?),
       (?, ?, ?, ?, ?, ?, ?),
       (?, ?, ?, ?, ?, ?, ?),
       (?, ?, ?, ?, ?, ?, ?),
       (?, ?, ?, ?, ?, ?, ?)`,
      [
        "Computer Lab 1",
        "Computer Lab",
        "Engineering Block - Ground Floor",
        60,
        "Modern computer laboratory for academic and technical activities.",
        "AVAILABLE",
        "60 PCs, Projector, AC, High-speed Internet",

        "Seminar Hall",
        "Seminar Hall",
        "Main Building - First Floor",
        150,
        "Large hall suitable for seminars, workshops and presentations.",
        "AVAILABLE",
        "Projector, Sound System, AC, Stage",

        "Smart Classroom 101",
        "Classroom",
        "Engineering Block - First Floor",
        80,
        "Technology-enabled classroom for lectures and demonstrations.",
        "AVAILABLE",
        "Smart Board, Projector, AC, Wi-Fi",

        "Conference Room",
        "Conference Room",
        "Administration Block",
        20,
        "Meeting room for faculty and administrative discussions.",
        "AVAILABLE",
        "Display, Video Conferencing, Wi-Fi",

        "Auditorium",
        "Auditorium",
        "Main Building - Ground Floor",
        500,
        "Large auditorium for major institutional events.",
        "AVAILABLE",
        "Stage, Projector, Sound System, AC",

        "Sports Complex",
        "Sports Facility",
        "Sports Ground",
        100,
        "Indoor and outdoor sports facility for campus activities.",
        "AVAILABLE",
        "Indoor Court, Changing Rooms, Equipment",
      ]
    );

    // Bookings
    await db.query(
      `INSERT INTO bookings
       (user_id, facility_id, booking_date, start_time, end_time, purpose, status)
       VALUES
       (?, ?, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:00:00', '12:00:00', ?, 'APPROVED'),
       (?, ?, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '14:00:00', '16:00:00', ?, 'PENDING'),
       (?, ?, DATE_ADD(CURDATE(), INTERVAL 3 DAY), '09:00:00', '11:00:00', ?, 'APPROVED')`,
      [
        2,
        1,
        "Programming Laboratory Session",

        3,
        2,
        "Faculty Workshop",

        4,
        3,
        "Student Project Presentation",
      ]
    );

    // Maintenance
    await db.query(
      `INSERT INTO maintenance
       (facility_id, issue, priority, start_date, expected_completion, description, status)
       VALUES
       (?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), ?, 'IN_PROGRESS'),
       (?, ?, ?, DATE_ADD(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 7 DAY), ?, 'SCHEDULED')`,
      [
        4,
        "Air Conditioning Service",
        "MEDIUM",
        "Scheduled maintenance of conference room AC system.",

        6,
        "Court Flooring Inspection",
        "LOW",
        "Routine inspection and maintenance of sports facility flooring.",
      ]
    );

    // Make conference room under maintenance
    await db.query(
      `UPDATE facilities
       SET status = 'UNDER_MAINTENANCE'
       WHERE id = 4`
    );

    console.log("Database seeded successfully!");

    console.log("\nTest accounts:");
    console.log("Admin:   admin@campus.com / Admin@123");
    console.log("Student: student@campus.com / Student@123");
    console.log("Faculty: faculty@campus.com / Faculty@123");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seedDatabase();