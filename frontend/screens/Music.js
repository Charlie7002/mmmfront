import React, { useState, useEffect } from 'react';
import { HEROKU_IP } from '@env';
import {
	ScrollView,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ImageBackground,
} from 'react-native';

import { Overlay, Icon, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../components/Filter_music';
import MusicHomeItem from '../components/MusicHomeItem';
import PlaylistHomeItem from '../components/PlaylistHomeItem';
import TextCustom from '../components/TextCustom';
import SmileyItem from '../components/SmileyItem_music';
import { smileyMusicMoodList, musicAmbianceList, musicGenreList } from '../data/smiley';
import { filterMusicList } from '../data/filters';
import {
	toggleSmiley,
	toggleAmbianceFilter,
	toggleGenreFilter,
	removeMoodFilter,
	addAmbianceFilter,
	addGenreFilter,
	removeAmbianceFilter,
	removeGenreFilter,
} from '../features/music/musicSlice';
import Loader from '../components/Loader';

const Music = (props, { navigation }) => {
	const [listTop, setTop] = useState([]);
	const [listPlayL, setPlaylist] = useState([]);
	const [ambiList, setAmbi] = useState([]);
	const [ambiPlayL, setAmbiPL] = useState([]);
	const [genreList, setGenre] = useState([]);
	const [genrePlayL, setGenrePL] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const {
		displaySmiley,
		moodList,
		moodFilter,
		moodPlaylist,
		displayAmbiance,
		ambianceFilter,
		displayGenre,
		genreFilter,
	} = useSelector(state => state.music);

	const { token } = useSelector(state => state.token);

	var musics = [];
	var playlists = [];

	const dispatch = useDispatch();

	useEffect(() => {
		async function getTop() {
			var topRaw = await fetch(`${HEROKU_IP}/music/getTop`);
			var top = await topRaw.json();
			setTop(top.search);
			var playTopRaw = await fetch(`${LHEROKU_IP}/music/getPlaylist/top`);
			var playTop = await playTopRaw.json();
			setPlaylist(playTop.playlists);
		}
		getTop();
	}, []);

	useEffect(() => {
		const timer1 = setTimeout(() => {
			setIsLoading(false);
		}, 500);
		return () => {
			clearTimeout(timer1);
		};
	}, []);

	if (!moodFilter && !ambianceFilter && !genreFilter) {
		musics = listTop.map((e, i) => {
			return <MusicHomeItem key={i} title={e.track} url={e.cover} id={e.id} />;
		});
		playlists = listPlayL.map((e, i) => {
			return <PlaylistHomeItem key={i} title={e.name} url={e.image} />;
		});
	} else if (moodFilter) {
		musics = moodList.map((e, i) => {
			return <MusicHomeItem key={i} title={e.track} url={e.cover} id={e.id} />;
		});
		playlists = moodPlaylist.map((e, i) => {
			return <PlaylistHomeItem key={i} title={e.name} url={e.image} />;
		});
	} else if (ambianceFilter) {
		musics = ambiList.map((e, i) => {
			return <MusicHomeItem key={i} title={e.track} url={e.cover} id={e.id} />;
		});
		playlists = ambiPlayL.map((e, i) => {
			return <PlaylistHomeItem key={i} title={e.name} url={e.image} />;
		});
	} else if (genreFilter) {
		musics = genreList.map((e, i) => {
			return <MusicHomeItem key={i} title={e.track} url={e.cover} id={e.id} />;
		});
		playlists = genrePlayL.map((e, i) => {
			return <PlaylistHomeItem key={i} title={e.name} url={e.image} />;
		});
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/images/music_bg.jpg')}
				style={styles.image}
				resizeMode="cover"
			>
				<View
					style={{
						flexWrap: 'wrap',
						alignSelf: 'flex-end',
						flexDirection: 'row',
						marginRight: 20,
						marginTop: 40,
					}}
				>
					<Icon
						name="user"
						color="white"
						type="antdesign"
						onPress={() => props.navigation.navigate(token == '' ? 'Signup' : 'Settings')}
					/>
				</View>
				{isLoading && <Loader />}
				{!isLoading && (
					<>
						<View>
							<Overlay
								overlayStyle={{
									backgroundColor: 'rgba(117, 103, 129, .8)',
									borderRadius: 10,
									top: -130,
									left: -10,
								}}
								isVisible={displaySmiley}
								onBackdropPress={() => {
									dispatch(toggleSmiley());
									dispatch(removeMoodFilter());
								}}
							>
								<View style={{ height: 190, width: 240, paddingTop: 12 }}>
									<View
										style={{
											flex: 1,
											flexDirection: 'row',
											justifyContent: 'center',

											flexWrap: 'wrap',
										}}
									>
										{smileyMusicMoodList.map((smiley, i) => (
											<SmileyItem name={smiley.name} key={smiley.name + i} />
										))}
									</View>
								</View>
							</Overlay>
							<Overlay
								overlayStyle={{
									backgroundColor: 'rgba(117, 103, 129, .8)',
									borderRadius: 10,
									top: -130,
									left: -10,
								}}
								isVisible={displayAmbiance}
								onBackdropPress={() => {
									dispatch(toggleAmbianceFilter());
									dispatch(removeAmbianceFilter());
								}}
							>
								<View style={{ height: 190, width: 140 }}>
									<View>
										{musicAmbianceList.map((ambiance, i) => (
											<Button
												key={i}
												size="sm"
												buttonStyle={{
													color: 'white',
													backgroundColor: 'rgba(255,0,0,0)',
													padding: 3,
												}}
												title={ambiance.name}
												onPress={async () => {
													dispatch(addAmbianceFilter(ambiance.name));
													var filterAmbianceRaw = await fetch(
														`${HEROKU_IP}/music/ambiance/${ambiance.name}`,
													);
													var ambianceMusic = await filterAmbianceRaw.json();
													var filterAmbiance = ambianceMusic.filter;
													setAmbi(filterAmbiance);
													var filterAmbiancePLRaw = await fetch(
														`${HEROKU_IP}/music/getPlaylist/${ambiance.name}`,
													);
													var ambiancePLMusic = await filterAmbiancePLRaw.json();
													var filterAmbiancePL = ambiancePLMusic.playlists;
													setAmbiPL(filterAmbiancePL);
													dispatch(toggleAmbianceFilter());
													dispatch(removeMoodFilter());
													dispatch(removeGenreFilter());
												}}
											/>
										))}
									</View>
								</View>
							</Overlay>
							<Overlay
								overlayStyle={{
									backgroundColor: 'rgba(117, 103, 129, .8)',
									borderRadius: 10,
									top: -130,
									left: -10,
								}}
								isVisible={displayGenre}
								onBackdropPress={() => {
									dispatch(toggleGenreFilter());
									dispatch(removeGenreFilter());
								}}
							>
								<View style={{ height: 190, width: 140 }}>
									<View>
										{musicGenreList.map((genre, i) => (
											<Button
												key={i}
												size="sm"
												buttonStyle={{
													color: 'white',
													backgroundColor: 'rgba(255,0,0,0)',
													padding: 3,
												}}
												title={genre.name}
												onPress={async () => {
													dispatch(addGenreFilter(genre.name));
													var filterGenreRaw = await fetch(
														`${HEROKU_IP}/music/genre/${genre.name}`,
													);
													var genreMusic = await filterGenreRaw.json();
													var filterGenre = genreMusic.filter;
													setGenre(filterGenre);
													var filterGenrePLRaw = await fetch(
														`${HEROKU_IP}/music/getPlaylist/${genre.name}`,
													);
													var genrePLMusic = await filterGenrePLRaw.json();
													var filterGenrePL = genrePLMusic.playlists;
													setGenrePL(filterGenrePL);
													dispatch(toggleGenreFilter());
													dispatch(removeMoodFilter());
													dispatch(removeAmbianceFilter());
												}}
											/>
										))}
									</View>
								</View>
							</Overlay>
						</View>
						<ScrollView style={{ marginTop: 30, width: '100%' }}>
							<View style={styles.filters}>
								{filterMusicList.map((it, index) => {
									const { name } = it;
									return <Filter name={name} index key={index} />;
								})}
							</View>

							{/*list music*/}
							<TextCustom
								fontSize="15"
								fontWeight="light"
								style={{ textAlign: 'left', paddingLeft: 15, marginTop: 30 }}
							>
								Musiques
							</TextCustom>
							<ScrollView horizontal={true} style={{ marginTop: 10 }}>
								{musics}
							</ScrollView>
							<TextCustom
								fontSize="15"
								fontWeight="light"
								style={{ textAlign: 'left', paddingLeft: 15, marginTop: 30 }}
							>
								Playlists
							</TextCustom>
							<ScrollView horizontal={true} style={{ marginTop: 10 }}>
								{playlists}
							</ScrollView>
						</ScrollView>
					</>
				)}

				<TouchableOpacity
					style={styles.music_btn}
					onPress={() => props.navigation.navigate('Movie')}
				>
					<Image source={require('../assets/images/movie_btn.png')} style={styles.stretch} />
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	tabBarItemContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	container: {
		flex: 1,
	},
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	music_btn: {
		marginBottom: 20,
		height: 80,
		with: 80,
	},
	stretch: {
		width: 80,
		height: 80,
		resizeMode: 'stretch',
	},
	stretchFilter: {
		width: 65,
		height: 65,
		resizeMode: 'stretch',
		marginBottom: 10,
	},
	filters: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
});

export default Music;
