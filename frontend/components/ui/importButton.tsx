import * as React from "react"
import { Button } from "@/components/ui/button"  // Adjust the import path according to your project structure

const ImportButton: React.FC = () => {
  // File input reference to trigger the file dialog
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle the file upload trigger
  const handleButtonClick = () => {
    fileInputRef.current?.click();  // Trigger the file input when the button is clicked
  };

  // Handle file input change (i.e., when a user selects a file)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file here (e.g., parse Excel file, etc.)
      console.log("File selected:", file);
    }
  };

  return (
    <div className="import-section">
      {/* Use the Button component for the import button */}
      <Button 
        variant="outline" 
        size="default" 
        onClick={handleButtonClick}
      >
        Import Excel File
      </Button>
      
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept=".xlsx, .xls" 
        style={{ display: "none" }} 
        onChange={handleFileChange} 
      />
    </div>
  );
};

export default ImportButton;
