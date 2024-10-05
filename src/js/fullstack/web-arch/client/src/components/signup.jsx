import { useState } from "react";

const url = import.meta.env.VITE_API_URL;

export default function SignUp() {
  const values = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(values);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch(`${url}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      localStorage.setItem("id", data?.user?._id);
      console.log(data);
      setFormData(values);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h3>Sign Up</h3>
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Your password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
}
