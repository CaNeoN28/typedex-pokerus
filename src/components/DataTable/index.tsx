import React from "react";
import "./DataTable.css"

export default function DataTable({ children }: { children?: React.ReactNode }) {
  return (
    <div className="dataTable">
      {children}
    </div>
  )
}