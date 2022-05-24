import React from "react";
import TableData from "../../types/TableData";
import "./DataTable.scss"

interface Props {
  data: TableData
}

export default function DataTable({ data }: Props) {
  return (
    <div className="dataTable">
      <div className="dataTable__header">{data.title}</div>
      <table className="dataTable__body">
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index} className="dataTable__body__row">
              <td className="dataTable__body__row__key">{row.label}:</td>
              <td className="dataTable__body__row__value">
                <div className="dataTable__body__row__value__cell">
                  {row.values.map((value, index) => (
                    value
                  ))}
                </div>
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