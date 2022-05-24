import { TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { LOCAL_IP } from "@env";
import {
  addMoodFilter,
  addMoodList,
  addMoodPlay,
  toggleSmiley,
  removeAmbianceFilter,
  removeGenreFilter,
} from "../features/music/musicSlice";
import { smileyMusicMoodList } from "../data/smiley";

const SmileyItem = ({ name }) => {
  const dispatch = useDispatch();
  var filterMood = [];
  let uriImg = smileyMusicMoodList.find((item) => item.name === name).img;
  return (
    <TouchableOpacity
      onPress={async () => {
        dispatch(addMoodFilter(name));
        var filterMoodRaw = await fetch(`${LOCAL_IP}/music/mood/${name}`);
        var moodMusic = await filterMoodRaw.json();
        filterMood = moodMusic.filter;
        dispatch(addMoodList(filterMood));
        var filterMoodPLRaw = await fetch(
          `${LOCAL_IP}/music/getPlaylist/${name}`
        );
        var moodPL = await filterMoodPLRaw.json();
        var filterPLMood = moodPL.playlists;
        dispatch(addMoodPlay(filterPLMood));
        dispatch(toggleSmiley());
        dispatch(removeAmbianceFilter());
        dispatch(removeGenreFilter());
      }}
    >
      <Image style={styles.smiley} source={uriImg} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  smiley: {
    height: 50,
    width: 50,
    margin: 15,
  },
});

export default SmileyItem;
