const GenerateButton = ({ handleGenerate, loading }) => {
  return (
    <button
      className="generate-btn"
      onClick={handleGenerate}
      disabled={loading}
    >
      {loading ? "Generating FAQs..." : "Generate FAQs"}
    </button>
  );
};

export default GenerateButton;