import { useState, useEffect } from "react";
import "./index.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TextInput from "./components/TextInput";
import GenerateButton from "./components/GenerateButton";
import FAQAccordion from "./components/FAQAccordion";
import Footer from "./components/Footer";

import { generateFAQs } from "./services/api";

function App() {
  const [paragraph, setParagraph] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const clearText = () => {
    setParagraph("");
    setFaqs([]);
  };

  const handleGenerate = async () => {
    if (!paragraph.trim()) {
      alert("Please enter a paragraph.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateFAQs(paragraph);

      setFaqs(data.faqs);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="container">
        <Hero />

        <TextInput
          paragraph={paragraph}
          setParagraph={setParagraph}
        />

        <GenerateButton
          handleGenerate={handleGenerate}
          loading={loading}
        />

        <button
          className="clear-btn"
          onClick={clearText}
        >
          Clear Text
        </button>

        <FAQAccordion
          faqs={faqs}
        />
      </main>

      <Footer />
    </>
  );
}

export default App;