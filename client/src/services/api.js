const API_URL = "https://ai-faq-generator-3rgj.onrender.com/api/faq";

export const generateFAQs = async (paragraph) => {
  try {
    const response = await fetch(`${API_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: paragraph,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate FAQs");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};