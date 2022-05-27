import React from "react";
import { Value } from "sass";
import TableData from "../../types/TableData";
import "./DataTable.scss"

interface Props {
  data: TableData
}

export default function DataTable({ data }: Props) {

  return (
    <div className="data-table">
      {data.title && <div className="header">{data.title}</div>}
      <table className={`body${!data.title ? ' no-title': ''}`}>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              <td className="row-key">{row.label}:</td>
              <td className="row-value-cell">
                  {Array.isArray(row.value) ? row.value.map((value, index) => (
                    <div key={index}>{value}</div>
                  )) : row.value}
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