import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Project from "./models/Project.js";
import Profile from "./models/Profile.js";

export async function seedData() {
  const email = process.env.ADMIN_EMAIL.toLowerCase();
  const existing = await User.findOne({ email });
  if (!existing) {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await User.create({ name: process.env.ADMIN_NAME || "Admin", email, password });
    console.log("Admin account created from .env");
  }

  if (await Profile.countDocuments() === 0) {
    await Profile.create({
      name: "Viknesh S",
      role: "MCA Student | Aspiring Full-Stack Developer",
      summary: "I am an MCA student and B.Sc. Computer Science graduate interested in web development and building useful technology solutions. I enjoy learning new tools, developing responsive interfaces, and working on practical projects.",
      email: "vikneshs2424@gmail.com",
      phone: "+91 7530070933",
      location: "Tamil Nadu, India",
      photo: "/profile.jpg",
      skills: ["C", "HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "IoT", "Git"]
    });
  }

  if (await Project.countDocuments() === 0) {
    await Project.insertMany([
      {
        title: "Smart Visitors Limit Management System for Temples",
        category: "IoT",
        date: "February 2025",
        description: "An IoT-based visitor management system that monitors the number of people entering and exiting a temple and helps maintain the permitted capacity.",
        technologies: ["ESP8266", "IR Sensors", "Servo Motor", "Buzzer"],
        highlights: ["Real-time visitor counting", "Automatic gate control using a servo motor", "Buzzer alert when the visitor limit is reached"],
        featured: true
      },
      {
        title: "Weather Forecast App",
        category: "Web Development",
        date: "October 2023",
        description: "A weather application that uses the OpenWeather API to retrieve and display current weather information.",
        technologies: ["HTML", "CSS", "JavaScript", "OpenWeather API"],
        highlights: ["Displays temperature and weather conditions", "Shows location-based weather information", "Handles API data and updates"],
        featured: true
      }
    ]);
  }
}
