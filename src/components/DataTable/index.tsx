import React from "react";
import TableData from "../../types/TableData";
import "./DataTable.css"

interface Props {
  data: TableData
}

export default function DataTable({ data }: Props) {
  return (
    <div className="dataTable">
      <span className="tableHeader">{data.title}</span>
      <table className="tableBody">
        <tbody>
          {data.rows.map(row => (
            <tr className="tableRow">
              <td className="rowKey">{row.label}:</td>
              <td className="rowValue">
                {row.values.map(value => (
                  <a>{value}</a>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  {/* <div className="tableHeader">
          {genus}
        </div>
        <table className="tableBody">
          <tbody>
            <tr className="tableRow">
              <td className="rowKey">Types: </td>
              <td className="rowValue">{types.map(t => (
                <a>{t.type.name}</a>
              ))}</td>
            </tr>
            <tr className="tableRow">
              <td className="rowKey">Height: </td>
            </tr>
            <tr className="tableRow">
              <td className="rowKey">Weight: </td>
            </tr>
            <tr className="tableRow">
              <td className="rowKey">Egg groups: </td>
            </tr>
            <tr className="tableRow">
              <td className="rowKey">Growth rate: </td>
            </tr>
          </tbody>
        </table> */}
}