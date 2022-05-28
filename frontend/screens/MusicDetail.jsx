import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
	Linking,
} from 'react-native';
import { HEROKU_IP } from '@env';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import TextCustom from '../components/TextCustom';
import { Button, Icon, ListItem, Avatar } from 'react-native-elements';
import PlaylistHomeItem from '../components/PlaylistHomeItem';
import Loader from '../components/Loader';

const MusicDetail = ({ route, navigation }) => {
	const [musicDetail, setDetail] = useState({});
	const [topTracks, setTop] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = route.params;
	useEffect(() => {
		const getMusicDetail = async () => {
			var musicRaw = await fetch(`${HEROKU_IP}/music/getMusic/${id}`);
			var music = await musicRaw.json();
			setDetail(music.tracks);
			setTop(music.top);
			setAlbums(music.albums);
		};
		getMusicDetail();
	}, []);

	useEffect(() => {
		const timer1 = setTimeout(() => {
			setIsLoading(false);
		}, 500);
		return () => {
			clearTimeout(timer1);
		};
	}, []);
	const streamingMusic = [
		{ name: 'spotify', url: musicDetail.link },
		{ name: 'deezer', url: 'https://www.deezer.com/fr/' },
		{ name: 'applemusic', url: 'https://music.apple.com/fr/browse' },
		{ name: 'soundcloud', url: 'https://soundcloud.com/' },
		{ name: 'amazon', url: 'https://music.amazon.fr/' },
	];
	var buttonMusic = streamingMusic.map((e, i) => {
		if (e.name === 'spotify' || e.name === 'soundcloud' || e.name === 'amazon') {
			var type = 'font-awesome';
		} else if (e.name === 'deezer') {
			var type = 'font-awesome-5';
		} else {
			var type = 'fontisto';
		}
		return (
			<View key={i}>
				<Button
					onPress={() => {
						Linking.openURL(e.url);
					}}
					buttonStyle={{
						backgroundColor: 'rgba(255, 255, 255, 0.19)',
						width: 110,
						height: 80,
						borderWidth: 2,
						borderStyle: 'solid',
						borderColor: 'rgba(156, 171, 194, 0.45)',
						borderRadius: 10,
						marginHorizontal: 5,
					}}
					title=""
					icon={<Icon name={e.name} type={type} size={24} color="white" />}
				></Button>
			</View>
		);
	});
	if (topTracks && albums) {
		var topList = topTracks.map((e, i) => {
			return (
				<ListItem
					containerStyle={{
						backgroundColor: 'rgba(255, 255, 255, 0.19)',
						marginVertical: 5,
						marginHorizontal: 5,
						borderRadius: 10,
					}}
					key={i}
					onPress={() => navigation.push('MusicDetail', { id: e.id })}
				>
					<Avatar
						source={{
							uri: e.cover,
						}}
					/>
					<ListItem.Content>
						<ListItem.Title>
							<TextCustom>{e.title}</TextCustom>
						</ListItem.Title>
						<ListItem.Subtitle>
							<TextCustom>{e.artist}</TextCustom>
						</ListItem.Subtitle>
					</ListItem.Content>
				</ListItem>
			);
		});
		var albumList = albums.map((e, i) => {
			return <PlaylistHomeItem key={i} title={e.name} url={e.cover} />;
		});
	}
	return (
		<ImageBackground
			source={require('../assets/images/music_bg.jpg')}
			style={styles.imagebg}
			resizeMode="cover"
		>
			<ScrollView style={styles.container}>
				<TouchableOpacity style={styles.back_btn} onPress={() => navigation.goBack()}>
					<AntDesign name="arrowleft" size={24} color="white" />
				</TouchableOpacity>
				{isLoading && <Loader />}
				{!isLoading && (
					<>
						<TextCustom
							fontSize="22"
							fontWeight="bold"
							style={{ marginBottom: 15, marginTop: 5 }}
						>
							{musicDetail.title}
						</TextCustom>
						<Image
							source={{
								uri: musicDetail.image,
							}}
							style={{
								borderRadius: 10,
								height: 300,
								width: '100%',
							}}
							resizeMode="cover"
						/>
						<ScrollView horizontal={true} style={{ marginTop: 10 }}>
							{buttonMusic}
						</ScrollView>
						<TextCustom>Album: {musicDetail.album}</TextCustom>
						<TextCustom style={{ marginBottom: 6 }}>Artiste: {musicDetail.artist}</TextCustom>
						<View>
							<TextCustom>Top des titres</TextCustom>
							<View>{topList}</View>
							<TextCustom>Albums de l'artiste</TextCustom>
							<ScrollView horizontal={true} style={{ marginTop: 10 }}>
								{albumList}
							</ScrollView>
						</View>
					</>
				)}
			</ScrollView>
		</ImageBackground>
	);
};

export default MusicDetail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
		width: '100%',
	},
	imagebg: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	back_btn: {
		width: '100%',
		marginLeft: 20,
	},
	btn_heart: {
		position: 'absolute',
		right: 20,
		top: 80,
		zIndex: 99,
	},
});
