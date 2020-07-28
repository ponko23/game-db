import React from "react";
import { RecoilRoot } from "recoil";
import { PlateList } from "./containers/PlateList";
import { PlateFilter } from "./components/PlateFilter";
import { PlatePagination } from "./components/PlatePagination";
import { useRecoilTransactionObserver_UNSTABLE } from "recoil";
import {
  favsState,
  plateFilterSettingState,
  PlateFilterSetting,
} from "./atoms/plate";
import { Container, Divider } from "@material-ui/core";

function PersistenceObserver() {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    // TODO : どのatomが更新されたかわからないので、毎回全部保存してるのでどうにかしたい

    var favs = snapshot.getLoadable(favsState).contents;
    var favsJson = JSON.stringify(Array.from(favs as Map<number, boolean>));
    if (localStorage.getItem(favsState.key) !== favsJson) {
      localStorage.setItem(favsState.key, favsJson);
    }

    var filter = snapshot.getLoadable(plateFilterSettingState)
      .contents as PlateFilterSetting;

    var rality = Array.from(filter.rality as Map<string, boolean>);
    var ralityJson = JSON.stringify(rality);
    if (localStorage.getItem("plateRality") !== ralityJson) {
      localStorage.setItem("plateRality", ralityJson);
    }

    var type = Array.from(filter.type as Map<string, boolean>);
    var typeJson = JSON.stringify(type);
    if (localStorage.getItem("plateType") !== typeJson) {
      localStorage.setItem("plateType", typeJson);
    }

    var effectiveDiva = Array.from(
      filter.effectiveDiva as Map<string, boolean>
    );
    var effectiveDivaJson = JSON.stringify(effectiveDiva);
    if (localStorage.getItem("plateEffectiveDiva") !== effectiveDivaJson) {
      localStorage.setItem("plateEffectiveDiva", effectiveDivaJson);
    }

    var liveSkill = filter.liveSkill;
    if (localStorage.getItem("liveSkill") !== liveSkill) {
      localStorage.setItem("liveSkill", liveSkill);
    }
  });
  return null;
}

function App() {
  document.title = "歌マクロスDB";
  return (
    <RecoilRoot>
      <PersistenceObserver />
      <Container
        maxWidth="xl"
        style={{ paddingLeft: 2, paddingRight: 2, marginBottom: 2 }}
      >
        <PlateFilter />
        <PlatePagination />
        <Divider />
        <PlateList />
        <Divider />
        <PlatePagination />
      </Container>
    </RecoilRoot>
  );
}

export default App;
