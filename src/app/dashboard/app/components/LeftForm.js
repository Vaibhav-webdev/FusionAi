"use client"

import {
  ChevronRight,
  LayoutTemplate,
  User,
  Mail,
  Phone,
  X,
  MapPin,
  Briefcase,
  Linkedin,
  Plus,
  Calendar,
  Sparkles,
  Globe,
  Palette,
  ChevronLeft
} from "lucide-react";
import ProfileUpload from "./upload";
import { toast } from "sonner";
import { useState, useRef } from "react";
import TemButton from "./TemButton"

export default function LeftForm(props) {
  const PersonalData = props.PersonalData
  const setPersonalData = props.setPersonalData
  const Experience = props.Experience
  const setExperience = props.setExperience
  const Education = props.Education
  const setEducation = props.setEducation
  const Project = props.Project
  const setProject = props.setProject
  const ProfessionalSummary = props.ProfessionalSummary
  const setProfessionalSummary = props.setProfessionalSummary
  const Skills = props.Skills
  const setSkills = props.setSkills
  const Main = props.Main
  const color = props.color
  const setColor = props.setColor
  const template = props.template
  const settemplate = props.settemplate
  const imageUrl = props.imageUrl
  const setImageUrl = props.setImageUrl

  const [show, setshow] = useState(0)
  const [skillInput, setSkillInput] = useState("")
  const [Experience2, setExperience2] = useState({
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    jobDescription: "",
  })
  const [Education2, setEducation2] = useState({
    institutionName: "",
    degree: "",
    fieldOfStudy: "",
    endDate: "",
    gpa: ""
  })
  const [Project2, setProject2] = useState({
    projectName: "",
    projectType: "",
    projectDescription: "",
  })
  const [prev, setprev] = useState(false)
  const [next, setnext] = useState(true)

  function addExperience() {
    setExperience(prev => [...prev, { ...Experience2 }]);
    setExperience2({
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      jobDescription: "",
    })
  }
  function addProject() {
    setProject(prev => [...prev, { ...Project2 }]);
    setProject2({
      projectName: "",
      projectType: "",
      projectDescription: ""
    })
  }
  function addEducation() {
    setEducation(prev => [...prev, { ...Education2 }]);
    setEducation2({
      institutionName: "",
      degree: "",
      fieldOfStudy: "",
      endDate: "",
      gpa: ""
    })
  }
  function removeSkill(skill, index) {
    setSkills(prev => prev.filter((_, i) => i !== index));

    toast.success("Deleted Successfully!", {
      description: "Your skills have been deleted successfully!",
    });
  }
  function addSkill() {

    if (!skillInput.trim()) return;

    setSkills((prev) => [...prev, skillInput.trim()]);
    setSkillInput("");
  }
  function handleNext() {
    if (show >= 5) {
      setnext(false)
    } else {
      setshow(show + 1)
      setprev(true)
    }
  }
  function handlePrev() {
    if (show <= 0) {
      setprev(false)
    } else {
      setnext(true)
      setshow(show - 1)
    }
  }
  const colorInputRef = useRef(null);


  const openColorPicker = () => {
    colorInputRef.current.click();
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const summary = true
  const project = false

  function askGemini(prompt, action) {
    toast.promise(
      async () => {
        const res = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        if (!res.ok) {
          const err = await res.text();
          toast.error("Gemini failed");
          return;
        }

        const data = await res.json();
        if (action) {
          setProfessionalSummary({ professionalSummary: data.text });
        } else {
          setExperience2({ jobDescription: data.text })
        }
      },
      {
        loading: "Generating Content...",
        success: "Generated Successfully!",
        error: "Could not Generate!",
      })
  }

  return (
    <div className="w-full md:w-[40%] bg-white rounded-xl shadow border border-t-3 border-gray-200">
      {/* Top Tabs */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-300">
        <div className="flex gap-2">
          {/* <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-blue-200 cursor-pointer transition duration-150 ease-in text-sm rounded-md bg-blue-50 text-blue-600">
            <LayoutTemplate size={16} />
            Template
          </button> */}
          <TemButton template={template} settemplate={settemplate} />

          <button onClick={openColorPicker} className="flex hover:bg-purple-200 cursor-pointer transition duration-150 ease-in items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-purple-50 text-purple-600">
            <Palette size={16} />
            Accent
          </button>
          <input
            ref={colorInputRef}
            type="color"
            value={color}
            onChange={handleColorChange}
            className="hidden"
          />
        </div>

        <div className="flex gap-5">
          {prev && <button onClick={handlePrev} className="flex cursor-pointer hover:text-gray-900 items-center gap-1 text-sm text-gray-700">
            <ChevronLeft size={16} /> <span className="hidden lg:flex">Previous</span>
          </button>}
          {next && <button onClick={handleNext} className="flex cursor-pointer hover:text-gray-900 items-center gap-1 text-sm text-gray-700">
            <span className="hidden lg:flex">Next</span> <ChevronRight size={16} />
          </button>}
        </div>
      </div>
      {show === 0 && <div className="p-6 space-y-5">
        <div>
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <p className="text-sm text-gray-500">
            Get Started with the personal information
          </p>
        </div>
        <ProfileUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
        {/* <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-14 h-14 flex items-center justify-center rounded-full border border-dashed">
            <Upload className="text-gray-400" />
          </div>
          <span className="text-sm text-gray-600">Upload user image</span>
        </div> */}

        <Input
          icon={<User size={18} />}
          label="Full Name"
          p_name="Enter your full name"
          required
          value={PersonalData.name}
          onChange={(e) => {
            console.log("Hello Problems")
            setPersonalData({ ...PersonalData, name: e.target.value })
          }}
        />

        <Input
          icon={<Mail size={18} />}
          label="Email Address"
          p_name="Enter your email address"
          required
          value={PersonalData.email}
          onChange={(e) => setPersonalData({ ...PersonalData, email: e.target.value })}
        />

        <Input
          icon={<Phone size={18} />}
          label="Phone Number"
          p_name="Enter your phone number"
          value={PersonalData.phone}
          onChange={(e) => setPersonalData({ ...PersonalData, phone: e.target.value })}
        />

        <Input
          icon={<MapPin size={18} />}
          label="Location"
          p_name="Enter your location"
          value={PersonalData.location}
          onChange={(e) => setPersonalData({ ...PersonalData, location: e.target.value })}
        />

        <Input
          icon={<Briefcase size={18} />}
          label="Profession"
          p_name="Enter your profession"
          value={PersonalData.profession}
          onChange={(e) =>
            setPersonalData({ ...PersonalData, profession: e.target.value })
          }
        />
        <Input
          icon={<Linkedin size={18} />}
          label="Linkedin Profile"
          p_name="Enter your linkedin profilr"
          value={PersonalData.linkedInProfile}
          onChange={(e) =>
            setPersonalData({ ...PersonalData, linkedInProfile: e.target.value })
          }
        />
        <Input
          icon={<Globe size={18} />}
          label="Website"
          p_name="Enter your website (optional)"
          value={PersonalData.website}
          onChange={(e) =>
            setPersonalData({ ...PersonalData, website: e.target.value })
          }
        />
      </div>}
      {show === 1 && <div className="p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">Professional Summary</h2>
            <p className="text-sm text-gray-500">
              Add summary for your resume here
            </p>
          </div>

          <button onClick={() => {
            askGemini(ProfessionalSummary.professionalSummary, summary);
          }} className="flex items-center hover:bg-purple-200 cursor-pointer transition duration-150 ease-in gap-2 px-3 py-1.5 text-sm rounded-md bg-purple-50 text-purple-600">
            <Sparkles size={16} />
            AI Enhance
          </button>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full min-h-[150px] border border-gray-300 resize-none rounded-md p-3 text-sm outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Write your compelling professional summary here that highlight your key stength and carrer objectives..."
          value={ProfessionalSummary.professionalSummary}
          onChange={(e) =>
            setProfessionalSummary({ ...ProfessionalSummary, professionalSummary: e.target.value })
          }
        />

        <p className="text-xs text-gray-500 text-center">
          Tip: Keep it concise (3–4 sentences) and focus on your most relevant
          achievements and skills.
        </p>
      </div>}
      {show === 2 && <div className='px-4 lg:px-8 py-3'>
        <div className="flex py-4 items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">Professional Experience</h2>
            <p className="text-sm text-gray-500">
              Add your job experience
            </p>
          </div>

          <button onClick={addExperience} className="flex items-center hover:bg-green-200 cursor-pointer transition duration-150 ease-in gap-2 px-3 py-1.5 text-sm rounded-md bg-green-50 text-green-600">
            <Plus size={16} />
            Add Exprerience
          </button>
        </div>

        {/* {show && <div className="flex gap-3 py-8 justify-center items-center flex-col">
                <div>
                  <Briefcase width={54} className="text-gray-300" height={54}/>
                </div>
                <div className="text-center text-gray-600">
                  <p>No work experience added yet.</p>
                  <p>Click "Add Experience" to get started.</p>
                </div>
              </div>} */}

        <div className="border mb-5 border-gray-300 rounded-lg p-4 space-y-4 relative">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">
              Experience #1
            </h3>
            <div className="bg-gray-50 hover:bg-gray-200 rounded-full">
              {/* <Trash2
                        size={16}
                        className="text-red-500 m-2 cursor-pointer"
                      //   onClick={() => removeExperience(index)}
                      /> */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Company Name"
              value={Experience2.companyName}
              onChange={(e) =>
                setExperience2({ ...Experience2, companyName: e.target.value })
              }
            />

            <input
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Job Title"
              value={Experience2.jobTitle}
              onChange={(e) =>
                setExperience2({ ...Experience2, jobTitle: e.target.value })
              }
            />

            <div className="relative">
              <Calendar
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="month"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
                placeholder="Start Date"
                value={Experience2.startDate}
                onChange={(e) =>
                  setExperience2({ ...Experience2, startDate: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <Calendar
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="month"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
                placeholder="End Date"
                value={Experience2.endDate}
                //   disabled={exp.current}
                onChange={(e) =>
                  setExperience2({ ...Experience2, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={Experience2.currentlyWorking}
              onChange={(e) =>
                setExperience2({ ...Experience2, currentlyWorking: e.target.checked })
              }
            />
            Currently working here
          </label>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              Job Description
            </label>
            <button onClick={() => {
              askGemini(Experience2.jobDescription, project);
            }} className="flex bg-purple-100 transition duration-150 ease-in cursor-pointer hover:bg-purple-300 rounded py-1 px-3 items-center gap-1 text-sm text-purple-600">
              <Sparkles size={14} />
              Enhance with AI
            </button>
          </div>

          <textarea
            className="w-full min-h-36 border border-gray-300 resize-none rounded-md p-3 text-sm"
            placeholder="Describe your key responsibilities and achievements that enhance your appearence..."
            value={Experience2.jobDescription}
            onChange={(e) =>
              setExperience2({ ...Experience2, jobDescription: e.target.value })
            }
          />
        </div>
      </div>}
      {show === 3 && (
        <div className="p-4 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">Education</h2>
              <p className="text-sm text-gray-500">
                Add your education details
              </p>
            </div>

            <button onClick={addEducation}
              className="flex items-center gap-2 px-4 py-1.5 text-sm rounded-md bg-emerald-50 text-emerald-600"
            >
              <Plus size={16} />
              Add Education
            </button>
          </div>

          {/* Education Cards */}
          <div
            className="border border-gray-300 rounded-lg p-4 space-y-4 relative"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                Education #1
              </h3>
              {/* <Trash2
            size={16}
            className="text-red-500 cursor-pointer"
            onClick={() => removeEducation(index)}
          /> */}
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Institution Name"
                value={Education2.institutionName}
                onChange={(e) =>
                  setEducation2({ ...Education2, institutionName: e.target.value })
                }
              />

              <input
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Degree (e.g., Bachelor's, Master's)"
                value={Education2.degree}
                onChange={(e) =>
                  setEducation2({ ...Education2, degree: e.target.value })
                }
              />

              <input
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Field of Study"
                value={Education2.fieldOfStudy}
                onChange={(e) =>
                  setEducation2({ ...Education2, fieldOfStudy: e.target.value })
                }
              />

              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
                  value={Education2.endDate}
                  onChange={(e) =>
                    setEducation2({ ...Education2, endDate: e.target.value })
                  }
                />
              </div>

              <input
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="GPA (optional)"
                value={Education2.gpa}
                onChange={(e) =>
                  setEducation2({ ...Education2, gpa: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}
      {show === 4 && (
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">Projects</h2>
              <p className="text-sm text-gray-500">
                Add your projects
              </p>
            </div>

            <button onClick={addProject}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-emerald-50 text-emerald-600"
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>

          {/* Education Cards */}
          <div
            className="border border-gray-300 rounded-lg p-4 pb-6 space-y-4 relative"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                Projects #1
              </h3>
              {/* <Trash2
            size={16}
            className="text-red-500 cursor-pointer"
            onClick={() => removeEducation(index)}
          /> */}
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 gap-3">
              <input
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Project Name"
                value={Project2.projectName}
                onChange={(e) =>
                  setProject2({ ...Project2, projectName: e.target.value })
                }
              />

              <input
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Project Type"
                value={Project2.projectType}
                onChange={(e) =>
                  setProject2({ ...Project2, projectType: e.target.value })
                }
              />

              <textarea
                className="w-full min-h-36 border border-gray-300 resize-none rounded-md p-3 text-sm"
                placeholder="Describe your project that show your skills..."
                value={Project2.projectDescription}
                onChange={(e) =>
                  setProject2({ ...Project2, projectDescription: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}
      {show === 5 && (
        <div className="p-4 lg:p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-lg font-semibold">Skills</h2>
            <p className="text-sm text-gray-500">
              Add your technical and soft skills
            </p>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-md px-2 lg:px-3 py-2 text-sm"
              placeholder="Enter a skill (e.g., JavaScript, Project Management)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
            />

            <button
              onClick={addSkill}
              className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Skills.map((skill, index) => (<span
              key={index}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm"
            >
              {skill}
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => removeSkill(skill, index)}
              />
            </span>))}
          </div>
          <div className="text-blue-800 py-3 rounded px-3 bg-blue-100 text-sm"><span className="font-semibold">Tip:</span> Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).</div>
        </div>
      )}
      <div onClick={Main} className="flex justify-center px-6 pb-4 sm:pb-5">
        <button
          className="
      flex items-center justify-center gap-2
      text-sm
      border border-green-400
      hover:bg-green-300 hover:text-green-700
      text-green-600 bg-green-200
      cursor-pointer
      py-2.5 sm:py-3
      px-12 sm:px-10 md:px-16 lg:px-24
      transition duration-150 ease-in
      rounded
      w-full
    "
        >
          Save Changes
        </button>
      </div>

    </div>
  );
}
function Input({ icon, label, p_name, required, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex items-center gap-2 border border-gray-400 rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-blue-500">
        <span className="text-gray-400">{icon}</span>
        <input
          placeholder={p_name}
          className="w-full outline-none text-sm"
          {...props}
        />
      </div>
    </div>
  );
}