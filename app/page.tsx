// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { FileText, ArrowRight, CheckCircle, Zap, Shield } from "lucide-react";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <header className="px-4 sm:px-6 lg:px-8 py-6">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <FileText className="h-8 w-8 text-blue-600" />
//             <span className="text-2xl font-bold text-gray-900">PDF2JSON</span>
//           </div>
//           <div className="space-x-4">
//             <Link href="/sign-in">
//               <Button variant="ghost">Sign In</Button>
//             </Link>
//             <Link href="/sign-up">
//               <Button>Get Started</Button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center py-20">
//             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//               Convert PDF to
//               <span className="block text-blue-600">JSON in Seconds</span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
//               Transform your PDF documents into structured JSON data with our
//               powerful, AI-powered conversion tool. Perfect for developers, data
//               analysts, and businesses.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
//               <Link href="/sign-up">
//                 <Button size="lg" className="text-lg px-8 py-4">
//                   Start Converting
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Button>
//               </Link>
//               <Link href="/sign-in">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="text-lg px-8 py-4"
//                 >
//                   Sign In
//                 </Button>
//               </Link>
//             </div>

//             {/* Features Grid */}
//             {/* <div className="grid md:grid-cols-3 gap-8 mt-20">
//               <div className="bg-white rounded-lg p-6 shadow-lg">
//                 <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
//                   <Zap className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
//                 <p className="text-gray-600">
//                   Convert PDFs to JSON in seconds with our optimized processing engine.
//                 </p>
//               </div>

//               <div className="bg-white rounded-lg p-6 shadow-lg">
//                 <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
//                   <CheckCircle className="h-6 w-6 text-green-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Results</h3>
//                 <p className="text-gray-600">
//                   AI-powered extraction ensures high accuracy in data conversion.
//                 </p>
//               </div>

//               <div className="bg-white rounded-lg p-6 shadow-lg">
//                 <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 mx-auto">
//                   <Shield className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
//                 <p className="text-gray-600">
//                   Your documents are processed securely and never stored permanently.
//                 </p>
//               </div>
//             </div> */}
//           </div>

//           {/* How it Works */}
//           <div className="py-20">
//             <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
//               How It Works
//             </h2>
//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="text-center">
//                 <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
//                   1
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Upload PDF
//                 </h3>
//                 <p className="text-gray-600">
//                   Upload your PDF document securely to our platform.
//                 </p>
//               </div>
//               <div className="text-center">
//                 <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
//                   2
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   AI Processing
//                 </h3>
//                 <p className="text-gray-600">
//                   Our AI analyzes and extracts structured data from your PDF.
//                 </p>
//               </div>
//               <div className="text-center">
//                 <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
//                   3
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Download JSON
//                 </h3>
//                 <p className="text-gray-600">
//                   Get your perfectly formatted JSON data ready to use.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12 mt-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <FileText className="h-6 w-6" />
//             <span className="text-xl font-bold">PDF2JSON</span>
//           </div>
//           <p className="text-gray-400">
//             Convert your PDFs to JSON with ease. Built for developers, by
//             developers.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, CheckCircle, Zap, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PDF2JSON</span>
          </div>
          <div className="space-x-4">
            <Link href="/sign-in" passHref>
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up" passHref>
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <section className="text-center py-20">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Convert PDF to
              <span className="block text-blue-600">JSON in Seconds</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your PDF documents into structured JSON data with our
              powerful, AI-powered conversion tool. Perfect for developers, data
              analysts, and businesses.
            </p>

            <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 justify-center items-center mb-12">
              <Link href="/sign-up" passHref>
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 flex items-center"
                >
                  Start Converting <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sign-in" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </section>

          {/* Features Grid */}
          {/* Uncomment this section if you want to enable features */}
          {/* <section className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Convert PDFs to JSON in seconds with our optimized processing engine.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Results</h3>
              <p className="text-gray-600">
                AI-powered extraction ensures high accuracy in data conversion.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 mx-auto">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your documents are processed securely and never stored permanently.
              </p>
            </div>
          </section> */}

          {/* How it Works */}
          <section className="py-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Upload PDF
                </h3>
                <p className="text-gray-600">
                  Upload your PDF document securely to our platform.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI Processing
                </h3>
                <p className="text-gray-600">
                  Our AI analyzes and extracts structured data from your PDF.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Download JSON
                </h3>
                <p className="text-gray-600">
                  Get your perfectly formatted JSON data ready to use.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-6 w-6" />
            <span className="text-xl font-bold">PDF2JSON</span>
          </div>
          <p className="text-gray-400">
            Convert your PDFs to JSON with ease. Built for developers, by
            developers.
          </p>
        </div>
      </footer>
    </div>
  );
}
