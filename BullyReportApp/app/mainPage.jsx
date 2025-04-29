import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import image1 from './assets/image1.png';
import image2 from './assets/image2.png';
import image3 from './assets/image3.png';
import ReportPage from './reportPage';
import { router } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isSmallPhone = screenWidth < 1080;

const MainPage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Image source={require('./assets/school-logo.png')} style={styles.schoolLogo} />
        <View style={styles.headerContent}>
          <Text style={styles.appTitle}>Aplikasi untuk</Text>
          <Text style={styles.schoolName}>SMK Indera Mahkota 2</Text>
        </View>
        <TouchableOpacity style={styles.settingsIcon}>
          <Text style={{ fontSize: 20 }}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.largeCard} onPress={() => router.push('/reportPage')}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle1}>Lapor Kejadian Buli</Text>
            <Text style={styles.cardText1}>Lapor sekarang, setiap saat amat berharga</Text>
          </View>
          <Image source={image1} style={styles.cardImage1} />
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity style={styles.smallCard} onPress={() => router.push('/bookingPage')}>
            <Image source={image2} style={styles.cardImage2} />
            <View style={styles.cardTextContainer2}>
              <Text style={styles.cardTitle2}>Temu Janji</Text>
              <Text style={styles.cardText2}>Tempah sesi dengan kaunselor pilihan</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard}>
            <Image source={image3} style={styles.cardImage2} />
            <View style={styles.cardTextContainer2}>
              <Text style={styles.cardTitle2}>Borang RMBQ</Text>
              <Text style={styles.cardText2}>Klik untuk info lebih lanjut</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Carta Organisasi */}
      <View style={styles.bottomContainer}>
        <Text style={styles.sectionTitle}>Carta Organisasi</Text>
        <View style={styles.orgBox}>
          <Image source={require('./assets/school-logo.png')} style={styles.orgLogo} />
        </View>

        {/* Extra content in the bottom container */}
        <View style={styles.extraContent}>
          <Text style={styles.extraContentText}>Additional content that will expand the bottom container.</Text>
        </View>
      </View>
    </ScrollView>
  );
};



export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002B53',
  },
  header: {
    marginTop: 30,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
    position: 'relative',
  },
  appTitle: {
    color: '#fff',
    fontSize: isSmallPhone ? 12 : 14,
  },
  headerContent: {
    flex: 1,
    marginLeft: 60,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  schoolName: {
    color: '#fff',
    fontSize: isSmallPhone ? 18 : 20,
    fontWeight: 'bold',
  },
  schoolLogo: {
    position: 'absolute',
    left: 20,
    top: 45,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  settingsIcon: {
    position: 'absolute',
    top: 45,
    right: 20,
  },
  cardContainer: {
    backgroundColor: '#002B53',
    padding: 30,
  },
  largeCard: {
    backgroundColor: '#fff',
    height: isSmallPhone ? 120 : 140,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'visible', // allow image to extend outside
    position: 'relative',
  },
  cardImage1: {
    position: 'absolute',
    width: 160,
    height: 160,
    resizeMode: 'contain',
    bottom: 10,
    right: -10
  },
  cardTextContainer: {
    marginBottom: 5,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    paddingTop: 0,
    width: '48%',
    alignItems: 'left',
  },
  cardImage2: {
    width: 90,
    height: 90,
    marginTop: 0,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cardTextContainer2: {
    marginBottom: 5,
    flex: 1,
  },
  cardTitle1: {
    fontWeight: 'bold',
    fontSize: isSmallPhone ? 20 : 24,
    marginBottom: 0,
    textAlign: 'left',
  },
  cardTitle2: {
    fontWeight: 'bold',
    fontSize: isSmallPhone ? 18 : 20,
    marginBottom: 0,
    textAlign: 'center',
  },
  cardText1: {
    width: isSmallPhone ? 200 : 400,
    fontSize: isSmallPhone ? 11 : 12,
    textAlign: 'left',
  },
  cardText2: {
    fontSize: isSmallPhone ? 11 : 12,
    textAlign: 'center',
  },
  cardEmoji: {
    fontSize: 30,
    marginTop: 10,
  },
  bottomContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    flexGrow: 1,  // Ensures the container expands to fill the remaining space
  },
  orgChart: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: isSmallPhone ? 20 : 22,
    marginBottom: 10,
  },
  orgBox: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orgLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  extraContent: {
    marginTop: 20,
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
  },
  extraContentText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
