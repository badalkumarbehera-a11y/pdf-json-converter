"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FileUp, Upload, Trash2, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { processPDFWithSchema } from "@/lib/ai-agent/agent";
import { useRouter } from "next/navigation";

export default function Extraction() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [schemaString, setSchemaString] = useState("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [pdfLoadError, setPdfLoadError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cleanup effect to revoke blob URL when component unmounts
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 10 * 1024 * 1024
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 10MB are allowed.");
    }

    setFiles(validFiles);

    // Create preview URL for the first file
    if (validFiles.length > 0) {
      // Revoke previous URL if exists
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
      const newFileUrl = URL.createObjectURL(validFiles[0]);
      setFileUrl(newFileUrl);
      setPdfLoadError(false);
    }
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
        const extracted = result.data;
        const convertedData =
          Array.isArray(extracted) && extracted.length === 1
            ? extracted[0]
            : extracted;

        // Store data in sessionStorage for the results page
        sessionStorage.setItem(
          "extractionResult",
          JSON.stringify(convertedData)
        );
        const fileUrl = URL.createObjectURL(files[0]);
        // sessionStorage.setItem('extractionFile', JSON.stringify({
        //   name: files[0].name,
        //   size: files[0].size
        // }));

        sessionStorage.setItem(
          "extractionFile",
          JSON.stringify({
            name: files[0].name,
            size: files[0].size,
            url: fileUrl,
          })
        );

        toast.success("PDF converted to JSON successfully!");

        // Redirect to results page
        router.push("/extraction/results");
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
    setSchemaString("");
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl("");
    }
    setPdfLoadError(false);
  };

  const handlePdfError = () => {
    console.log("PDF failed to load in iframe");
    setPdfLoadError(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-2">
            <FileUp className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              PDF to JSON Converter
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            Upload your PDF and convert it to structured JSON data
          </p>
        </div>
      </div>

      {/* Two Section Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmitWithFiles} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - File Upload */}
            <div className="flex flex-col">
              <Card className="flex-1 flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    <span>Upload PDF</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 flex flex-col space-y-4">
                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex-1 flex flex-col justify-center">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="application/pdf"
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center justify-center h-full"
                      >
                        <FileUp className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          Click to upload PDF or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">
                          Maximum file size: 10MB
                        </p>
                      </label>
                    </div>

                    {/* File Preview Section */}
                    {files.length > 0 && (
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex-1 flex flex-col">
                        {/* File Info */}
                        <div className="flex items-center space-x-3 mb-4">
                          <FileText className="h-8 w-8 text-red-600" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {files[0].name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {(files[0].size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>

                        {/* PDF Preview */}
                        <div className="bg-gray-100 rounded-lg overflow-hidden flex-1">
                          {fileUrl && !pdfLoadError ? (
                            <iframe
                              src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH`}
                              className="w-full h-full border-0"
                              title="PDF Preview"
                              style={{ minHeight: "300px" }}
                              onError={handlePdfError}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                              <div className="text-center">
                                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>PDF preview not available</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Schema Input */}
            <div className="flex flex-col">
              <Card className="flex-1 flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <span>JSON Schema</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Define your JSON structure
                    </label>
                    <textarea
                      value={schemaString}
                      onChange={(e) => setSchemaString(e.target.value)}
                      placeholder='Enter your JSON schema here...&#10;&#10;Example:&#10;{&#10;  "invoiceNumber": "string",&#10;  "totalAmount": "number",&#10;  "date": "string",&#10;  "items": [&#10;    {&#10;      "name": "string",&#10;      "quantity": "number",&#10;      "price": "number"&#10;    }&#10;  ]&#10;}'
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      style={{ minHeight: "400px" }}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Define the structure you want for your JSON output. This
                      schema will guide the AI in extracting structured data
                      from your PDF.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Centered Action Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={files.length === 0 || isLoading}
              className="px-8"
            >
              {isLoading ? "Processing..." : "Convert to JSON"}
            </Button>
            {files.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={clearFiles}
                className="px-8"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
