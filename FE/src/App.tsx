import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🚀 TODO APP 
        </h1>
        <p className="text-gray-600 font-medium">
          Tailwind CSS (Bản mới nhất) đã được kích hoạt thành công!
        </p>
      </div>
    </div>
  );
}

export default App;