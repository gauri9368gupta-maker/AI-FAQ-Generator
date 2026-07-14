import { useState } from "react";

const FAQAccordion = ({ faqs = [] }) => {
  const [active, setActive] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Generated FAQs</h2>

      {faqs.map((faq, index) => (
        <div className="faq-card" key={index}>
          <h3
            style={{ cursor: "pointer" }}
            onClick={() => toggle(index)}
          >
            {index + 1}. {faq.question}
          </h3>

          {active === index && (
            <>
              <p>{faq.answer}</p>

              <button
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(faq.answer);
                  setCopiedIndex(index);

                  setTimeout(() => {
                    setCopiedIndex(null);
                  }, 2000);
                }}
              >
                {copiedIndex === index
                  ? "✅ Copied!"
                  : "📋 Copy Answer"}
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default FAQAccordion;