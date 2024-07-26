// utils/formatDate.ts
const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString().slice(2);
  
    return `${day}-${month}-${year}`;
  };
  
  // components/DateDisplay.tsx
  import React from 'react';
  
  interface DateDisplayProps {
    isoDateString: string;
  }
  
  const DateDisplay: React.FC<DateDisplayProps> = ({ isoDateString }) => {
    return (
      <div className=' mt-4 text-end text-xs text-gray-400'>
        Created at: {formatDate(isoDateString)}
      </div>
    );
  };
  
  export default DateDisplay;
  