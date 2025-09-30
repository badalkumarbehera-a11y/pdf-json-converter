"use server";

import OpenAI from "openai";
import { getUser } from "../db/queries";

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Utility: Convert schema string to something readable by the model
const normalizeSchema = (schema?: string) => {
  try {
    return schema && schema.trim() ? JSON.parse(schema) : null;
  } catch {
    return null;
  }
};

export const processPDFWithSchema = async (
  file: File,
  fileName: string,
  schema?: string
) => {
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized: User must be logged in");
  }

  try {
    // 1️⃣ Upload the PDF to OpenAI
    const fileUpload = await client.files.create({
      file,
      purpose: "assistants",
    });
    console.log("File uploaded to OpenAI:", fileUpload.id);

    // 2️⃣ Build the user instruction
    const schemaObj = normalizeSchema(schema);
    const schemaText = schemaObj
      ? `Extract all relevant details and structure them according to this JSON schema:\n${JSON.stringify(
          schemaObj,
          null,
          2
        )}`
      : `Extract the main content, title, and metadata (author, created date, pages).`;

    // 3️⃣ Call responses.create with the file attached
    const response = await client.responses.create({
      // model: "gpt-4.1", // or "gpt-5" if you have access
      model: "gpt-5-mini", // or "gpt-5" if you have access
      input: [
        {
          role: "system",
          content:
            "You are an assistant that extracts structured data from PDFs and outputs valid JSON only.",
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `${schemaText}\nReturn only valid JSON.`,
            },
            { type: "input_file", file_id: fileUpload.id },
          ],
        },
      ],
    });

    // 4️⃣ Extract the model’s JSON response
    const outputText = response.output_text;
    let parsed;
    try {
      parsed = JSON.parse(outputText);
    } catch {
      throw new Error("Model response was not valid JSON: " + outputText);
    }

    // 5️⃣ Clean up uploaded file
    try {
      await client.files.delete(fileUpload.id);
      console.log("File cleaned up:", fileUpload.id);
    } catch (cleanupError) {
      console.warn("Failed to cleanup file:", cleanupError);
    }

    return {
      success: true,
      data: parsed,
      filename: fileName,
      schema: schema || null,
    };
  } catch (error) {
    console.error("PDF processing error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to process PDF",
    };
  }
};
