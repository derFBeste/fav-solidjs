import {
  Component,
  createResource,
  createSignal,
  For,
  Index,
  Show,
} from "solid-js";
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
  color: string;
  movie: string;
  drink: string;
  food: string;
  number: number;
  superHero: string;
};

const url = "http://localhost:9001";

const {
  location: { search },
} = window;

console.log(search);

const recordCount = search ? search.split("=")[1] : 1000;
console.log(recordCount);
const fetchUserFavorites = async () =>
  (await fetch(`${url}/users?recordCount=${recordCount}`)).json();

const App: Component = () => {
  // const [recordCount, setRecordCount] = createSignal(recordCount);

  // combines a signal with a fetching a resource
  const [userFavorites] =
    createResource<Array<UserFavorite>>(fetchUserFavorites);

  const columnNames = () => Object.keys(userFavorites()[0]) || [];

  return (
    <>
      <Show when={userFavorites()}>
        <div class="ma1">
          <h2 class="mv2">Favorite Things</h2>
          <h3 class="mv2">record count: {recordCount}</h3>
          <table class="f6 w-100" cellSpacing="0">
            <thead>
              <tr>
                <Index each={columnNames()}>
                  {(colName) => (
                    <th class="fw6 tl pa1 pointer bb black--90">{colName}</th>
                  )}
                </Index>
              </tr>
            </thead>
            <tbody>
              <For each={userFavorites()}>
                {(userInfo) => (
                  <tr>
                    <Index each={Object.values(userInfo)}>
                      {(value) => (
                        <td class="pa1 tl bb bl black--90">{value}</td>
                      )}
                    </Index>
                  </tr>
                )}
              </For>
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
