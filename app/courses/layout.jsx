import React from 'react';

const CoursesLayout = ({ children }) => {
  // This layout component receives the child page (e.g., CoursesPage, CartPage)
  // as the 'children' prop and renders it.
  return (
    <div>
      {children}
    </div>
  );
};

export default CoursesLayout;