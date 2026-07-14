const TextInput = ({ paragraph, setParagraph }) => {
  return (
    <div className="input-container">

      <label>Paragraph</label>
      <textarea
        placeholder="Paste your paragraph here..."
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
      />

      <p className="count">
        Characters : {paragraph.length}
      </p>


    </div>
  );
};

export default TextInput;