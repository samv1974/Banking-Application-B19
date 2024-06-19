import React from 'react';

const HomePage = ({ handlePdfOpen, pdfStatus }) => {
  const pdfs = [
    { id: 1, title: "FSCS Information", description: "Read and review", url: "/pdfs/fscs.pdf" },
    { id: 2, title: "Terms & Conditions", description: "Read and review", url: "/pdfs/terms.pdf" },
    { id: 3, title: "Privacy Policy", description: "Read and review", url: "/pdfs/privacy.pdf" },
    { id: 4, title: "Key Features & Summary Box", description: "Read and review", url: "/pdfs/privacy.pdf" },
    { id: 5, title: "Additional Information", description: "Read and review", url: "/pdfs/privacy.pdf" },
  ];

  const openPdf = (url, id) => {
    window.open(url, "_blank");
    handlePdfOpen(id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 ">Sharkzee Bank</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Easy Access Account</span>
                </h2>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  An Easy Access Account from Sharkzee Bank with great rates and features.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#apply"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 ">
          <img
            className="h-full w-full object-cover"
            src="/bankim.jpeg"
            alt="Easy Access Account"
          />
        </div>
      </div>

      {/* Documents Section */}
      <section className="bg-white py-8" id="apply">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Important Documents to Review</h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Please open and read all of the following important documents - you won't be able to apply until you've done so.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pdfs.map((pdf) => (
              <button
                key={pdf.id}
                className="flex items-center justify-between px-4 py-5 bg-gray-50 text-gray-900 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => openPdf(pdf.url, pdf.id)}
              >
                <div>
                  <h3 className="text-lg font-medium">{pdf.title}</h3>
                  <p className="text-sm">{pdf.description}</p>
                </div>
                {pdfStatus[pdf.id] && (
                  <span className="text-green-500 ml-4">&#10003;</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
