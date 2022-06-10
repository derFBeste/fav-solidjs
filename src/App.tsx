import { Component, createResource, createSignal, Show } from "solid-js";
import "tachyons";
import styles from "./App.module.css";

type UserFavorite = {
  id: string;
  name: string;
  email: string;
  team: string;
  animal: string;
  musicGenre: string;
  song: string;
  book: string;
  // word: string;
  color: string;
  movie: string;
  drink: string;
  food: string;
  number: number;
  superHero: string;
  // quote: string;
};

const url = "http://localhost:9001";
const recordCount = 1000;
// const userFavorites = [];

// FOCUS:
// 1. add call to backend
// 2. display results
const fetchUserFavorites = async () =>
  (await fetch(`${url}/users?recordCount=${recordCount}`)).json();

const App: Component = () => {
  // const [userFavorites, setUserFavorites] = createSignal();

  // combines a signal with a fetch
  const [userFavorites] =
    createResource<Array<UserFavorite>>(fetchUserFavorites);

  // return (userFavorites.loading ? <div>"Loading..."</div> : <div>yo!</div>);

  return (
    <>
      <Show when={userFavorites()}>
        <div class="ma1">
          <h2 class="mv2">Favorite Things</h2>
          <h3 class="mv2">record count: {recordCount}</h3>
          <table class="f6 w-100" cellSpacing="0">
            <thead>
              <tr>
                {Object.keys(userFavorites()[0]).map((colName) => (
                  <th class="fw6 tl pa1 pointer bb black--90">{colName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userFavorites().map((userInfo) => (
                <tr>
                  {Object.values(userInfo).map((value) => (
                    <td
                      class="pa1 tl bb bl black--90"
                      key={`${userInfo.id}_${value}`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tbody></tbody>
          </table>
        </div>
      </Show>
      <Show when={userFavorites.loading}>
        <div class="ma1">Loading...</div>
      </Show>
    </>
  );
};

export default App;
