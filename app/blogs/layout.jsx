import React from 'react';

const BlogLayout = ({ children }) => {
  // This layout component receives the child page 
  // as the 'children' prop and renders it.
  return (
    <div>
      {children}
    </div>
  );
};

export default BlogLayout;