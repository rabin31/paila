// pages/api/gemini.js
export default async function handler(req, res) {
	if (req.method === "POST") {
		const { prompt } = req.body;

		try {
			const response = await fetch(
				"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
					},
					body: JSON.stringify({
						contents: [{ role: "user", parts: [{ text: prompt }] }],
					}),
				}
			);

			const data = await response.json();
			res.status(200).json(data);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Something went wrong" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
