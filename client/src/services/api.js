const API_URL = "http://localhost:5000/api/faq";

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

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};