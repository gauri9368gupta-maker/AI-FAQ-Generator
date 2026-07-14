import { useState } from "react";

import "./index.css";
import FAQAccordion from "./components/FAQAccordion";
import GenerateButton from "./components/GenerateButton";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TextInput from "./components/TextInput";
import Footer from "./components/Footer";
import { generateFAQs } from "./services/api";

function App() {
  const [paragraph, setParagraph] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
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
    }
    catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
    finally {
      setLoading(false);
    }
  };

  return (

    <>
      <Navbar />
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