import {
  Component,
  createResource,
  createSignal,
  For,
  Index,
  Show,
} from "solid-js";
import "tachyons";
import { createClient } from "@supabase/supabase-js";
import { matchSorter } from "match-sorter";

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

const defaultRecordCount = 1000;
// If there is a record count specified in the URL, use that.
// If not, use the default record count.
const upperLimit = search ? search.split("=")[1] : defaultRecordCount;

async function getUserInfo() {
  const { data, error } = await supabase
    .from("user-favorites")
    .select(
      "id, name, email, team, animal, musicGenre, song, book, color, movie, drink, food, number, superHero"
    )
    .range(0, Number(upperLimit) - 1);

  return data;
}
const fetchUserFavorites = async () => await getUserInfo();

const App: Component = () => {
  const [selectedUser, setSelectedUser] = createSignal<UserFavorite>();
  // combines a signal with a fetching a resource
  const [userFavorites, { mutate, refetch }] =
    createResource<Array<UserFavorite>>(fetchUserFavorites);

  const columnNames = () => Object.keys(userFavorites()[0]) || [];
  const recordCount = () => userFavorites().length || 0;

  function handleFilter(event: any) {
    const { value } = event.target;

    if (value) {
      mutate(
        matchSorter(userFavorites(), value, {
          keys: columnNames(),
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
        })
      );
    } else {
      refetch();
    }
  }

  return (
    <>
      <Show when={userFavorites()}>
        <div class="ma1">
          <div class="flex flex-row justify-between">
            <div>
              <h2 class="mv2">Favorite Things: Solid.js</h2>
              <h3 class="mv2">record count: {recordCount}</h3>
            </div>
            <input
              class="h2"
              type="text"
              placeholder="search"
              onInput={handleFilter}
            />
          </div>
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
                  <tr
                    class="pointer dim"
                    onClick={() => setSelectedUser(userInfo)}
                  >
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
