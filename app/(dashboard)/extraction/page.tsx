"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FileUp, Upload, Download, FileText, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { processPDFWithSchema } from "./actions";
import { processPDFWithSchema } from "@/lib/ai-agent/agent";

export default function Extraction() {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedData, setConvertedData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [schemaString, setSchemaString] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 10 * 1024 * 1024
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 10MB are allowed.");
    }

    setFiles(validFiles);
  };

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;

    // Validate schemaString if provided
    if (schemaString.trim()) {
      try {
        JSON.parse(schemaString);
      } catch (err) {
        toast.error(
          "Invalid JSON schema. Please check the syntax and try again."
        );
        return;
      }
    }

    setIsLoading(true);
    try {
      const result = await processPDFWithSchema(
        files[0],
        files[0].name,
        schemaString.trim() || undefined
      );

      if (result.success) {
        // setConvertedData(
        //   // filename: result.filename,
        //   // extractedData: result.data,
        //   result.data
        // );

        const extracted = result.data;
        setConvertedData(
          Array.isArray(extracted) && extracted.length === 1
            ? extracted[0]
            : extracted
        );
        toast.success("PDF converted to JSON successfully!");
        toast.success("PDF converted to JSON successfully!");
      } else {
        toast.error(result.error || "Failed to process PDF");
      }
    } catch (err) {
      console.error("PDF processing error:", err);
      toast.error("Failed to process PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setConvertedData(null);
    setSchemaString("");
  };

  const downloadJSON = () => {
    if (!convertedData || !isClient) return;

    const dataStr = JSON.stringify(convertedData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${files[0].name.replace(".pdf", "")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (!convertedData || !isClient) return;
    navigator.clipboard.writeText(JSON.stringify(convertedData, null, 2));
    toast.success("JSON copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              PDF to JSON Converter
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            Upload your PDF and convert it to structured JSON data
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 ">
              <Upload className="h-5 w-5 " />
              <span>Upload PDF</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitWithFiles} className="space-y-6">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="application/pdf"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Click to upload PDF or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    Maximum file size: 10MB
                  </p>
                </label>
              </div>

              {/* Selected File */}
              {files.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">{files[0].name}</p>
                  <p className="text-green-600 text-sm">
                    {(files[0].size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              )}

              {/* Schema Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  JSON Schema
                </label>
                <textarea
                  rows={6}
                  value={schemaString}
                  required
                  onChange={(e) => setSchemaString(e.target.value)}
                  placeholder='Enter your JSON schema here...&#10;&#10;Example:&#10;{&#10;  "invoiceNumber": "string",&#10;  "totalAmount": "number",&#10;  "date": "string"&#10;}'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Define the structure you want for your JSON output
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={files.length === 0 || isLoading}
                >
                  {isLoading ? "Processing..." : "Convert to JSON"}
                </Button>
                {files.length > 0 && (
                  <Button type="button" variant="outline" onClick={clearFiles}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {convertedData && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-800">
                  Conversion Complete
                </CardTitle>
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={downloadJSON} size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-700 overflow-auto max-h-96 whitespace-pre-wrap">
                  {JSON.stringify(convertedData, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
