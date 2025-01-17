import React from 'react';

const PDFContent = React.forwardRef(function PDFContent(props, ref) {
  return (
    <div ref={ref} className="p-5 bg-gray-100">
      <h1 className="text-gray-800">PDF Title</h1>
      <p className="text-sm">This is a paragraph with some content.</p>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Profession</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">John Doe</td>
            <td className="border border-gray-300 px-4 py-2">28</td>
            <td className="border border-gray-300 px-4 py-2">Developer</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Jane Smith</td>
            <td className="border border-gray-300 px-4 py-2">34</td>
            <td className="border border-gray-300 px-4 py-2">Designer</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default PDFContent;
