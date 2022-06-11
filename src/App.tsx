import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  Index,
  Show,
} from "solid-js";
import "tachyons";
import { createClient } from "@supabase/supabase-js";

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

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const {
  location: { search },
} = window;

const upperLimit = search ? search.split("=")[1] : 1000;

async function getUserInfo() {
  let { data, error } = await supabase
    .from("user-favorites")
    .select(
      "id, name, email, team, animal, musicGenre, song, book, color, movie, drink, food, number, superHero"
    )
    .range(0, Number(upperLimit));

  return data;
}
const fetchUserFavorites = async () => await getUserInfo();

const App: Component = () => {
  // combines a signal with a fetching a resource
  const [userFavorites] =
    createResource<Array<UserFavorite>>(fetchUserFavorites);

  const columnNames = () => Object.keys(userFavorites()[0]) || [];
  const recordCount = () => userFavorites().length || 0;

  return (
    <>
      <Show when={userFavorites()}>
        <div class="ma1">
          <h2 class="mv2">Favorite Things: Solid.js</h2>
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
      <Show when={userFavorites.error}>
        <div class="ma1">There was an error fetching data.</div>
      </Show>
    </>
  );
};

export default App;
