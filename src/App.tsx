import type { Component } from "solid-js";
import "tachyons";
import styles from "./App.module.css";

const recordCount = 1000;
const userFavorites = [];

const App: Component = () => {
  return (
    <div class="ma1">
      <h2 class="mv2">Favorite Things</h2>
      <h3 class="mv2">record count: {recordCount}</h3>
      <table class="f6 w-100">
        <thead>
          <tr>
            {/* {Object.keys(userFavorites[0]).map((colName) => (
              <th class="fw6 tl pa1 pointer bb black--90" key={colName}>
                {colName}
              </th>
            ))} */}
          </tr>
        </thead>
        <tbody>
          {/* {userFavorites.map((userInfo) => (
            <tr key={`${userInfo.id}`}>
              {Object.values(userInfo).map((value) => (
                <td
                  class="pa1 tl bb bl black--90"
                  key={`${userInfo.id}_${value}`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))} */}
        </tbody>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default App;
