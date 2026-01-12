import React, { useState } from "react";
import SEO from "../Component/SEO";
import { LuMail, LuMessageCircle, LuUser } from "react-icons/lu";
import { toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    // TODO: Send email via backend
    toast.success("Message sent! We'll get back to you soon.", {
      position: "top-center",
      autoClose: 3000,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <SEO
        title="Contact Us - ChallengerDaily"
        description="Get in touch with the ChallengerDaily team. We're here to help you with any questions, feedback, or support needs."
        keywords="contact, support, feedback, help, customer service"
      />

      <div className="bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-start py-10 md:py-20 px-5">
        <div className="max-w-3xl w-full animate-fade-in">
          {/* Header */}
          <div className="mb-12 text-center animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Email me at
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              inphorment@gmail.com
            </p>
          </div>


          {/* <div className="bg-white dark:bg-slate-800 p-6 md:p-8    -md border dark:border-slate-700 animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <LuUser size={20} className="text-primary" />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="px-4 py-3  -lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <LuMail size={20} className="text-primary" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="px-4 py-3  -lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <LuMessageCircle size={20} className="text-primary" />
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="px-4 py-3  -lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-slate-900 dark:text-white">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  rows="6"
                  className="px-4 py-3  -lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                />
              </div>

              
              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3  -lg transition-all duration-200 hover: -lg active:scale-100  -md"
              >
                Send Message
              </button>
            </form>
          </div>

          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6    -md border dark:border-slate-700 text-center animate-slide-up">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4  ">
                  <LuMail size={32} className="text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                Email
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                support@challengerdaily.com
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6    -md border dark:border-slate-700 text-center animate-slide-up">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-4  ">
                  <LuMessageCircle size={32} className="text-primary" />
                </div>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                Response Time
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We typically respond within 24 hours
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
