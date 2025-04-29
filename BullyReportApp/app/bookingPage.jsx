// booking.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons'; // Or use react-native-vector-icons
import { Platform } from 'react-native';
import image2 from './assets/image2.png';
import { router } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isSmallPhone = screenWidth < 1080;

const Booking = () => {
  const counselors = [
    { id: 'Mohamad', name: 'En Mohamad', email: 'mohamad@example.com', details: 'Kaunselor berpengalaman dalam kaunseling pelajar.' },
    { id: 'Rosmah', name: 'Pn Rosmah', email: 'rosmah@example.com', details: 'Pakar dalam pengurusan tekanan dan motivasi.' },
    { id: 'Mansor', name: 'En Mansor', email: 'mansor@example.com', details: 'Fokus kepada pembangunan kerjaya dan akademik.' },
    { id: 'Aminah', name: 'Pn Aminah', email: 'aminah@example.com', details: 'Kaunseling untuk isu keluarga dan emosi.' },
    { id: 'Rahim', name: 'En Rahim', email: 'rahim@example.com', details: 'Berpengalaman dalam kaunseling belia dan sosial.' },
    { id: 'Farah', name: 'Pn Farah', email: 'farah@example.com', details: 'Pakar dalam kaunseling perkahwinan dan hubungan.' },
    { id: 'Zahid', name: 'En Zahid', email: 'zahid@example.com', details: 'Tumpuan kepada kesihatan mental pelajar IPT.' },
    { id: 'Siti', name: 'Pn Siti', email: 'siti@example.com', details: 'Kaunseling psikologi dan pembangunan diri.' },
  ];
  

  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, counselors.length));
  };

  const [topic, setTopic] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set' && selectedDate) {
        setDate(selectedDate);
      }
      // Close the picker regardless of action
      setShow(false);
    } else {
      // iOS: Update value on selection, keep picker open
      if (selectedDate) {
        setDate(selectedDate);
      }
    }
  };

  const showPicker = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const handleOK = () => {
    setShow(false);
    // Additional validation if needed
    const now = new Date();
    if (date < now) {
      alert('Tarikh/masa tidak boleh pada hari sebelum ini!');
      setDate(now); // Reset to current date
    }
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // For iOS, padding works well. For Android, height works.
            >
<ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Tempahan Sesi dengan Kaunselor</Text>
        <Image
          source={require('./assets/image2.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.dividerTop} />

      <Text style={styles.sectionTitle}>Sila pilih kaunselor yang anda inginkan</Text>
      <Text style={styles.subText}>(Pilih salah satu)</Text>

      <View style={{ height: 300 }}>
      <ScrollView style={{ backgroundColor: '#FFF', borderRadius: 10, padding: 10 }} showsVerticalScrollIndicator={true} nestedScrollEnabled={true} >
        {counselors.map((counselor) => (
          <TouchableOpacity
            key={counselor.id}
            style={[
              styles.card,
              selectedCounselor === counselor.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedCounselor(counselor.id)}
          >
            <View style={styles.cardContent}>
              <FontAwesome name="user" size={32} color="black" />
              <View style={styles.cardText}>
                <Text style={styles.name}>{counselor.name}</Text>
                <Text style={styles.link}>Maklumat</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      </View>
      


      <View style={styles.dividerTop} />

      <Text style={styles.sectionTitle}>Pilih tarikh & masa untuk temu janji</Text>
      <Text style={styles.subLabel}>(Klik untuk pilih tarikh dan masa)</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.dateTimeButton}
          onPress={() => showPicker('date')}
        >
          <FontAwesome name="calendar" size={18} color="white" />
          <Text style={styles.dateTimeText}>
            {date.toLocaleDateString() === currentDate.toLocaleDateString()
              ? 'Pilih Tarikh'
              : date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateTimeButton}
          onPress={() => showPicker('time')}
        >
          <FontAwesome name="clock-o" size={18} color="white" />
          <Text style={styles.dateTimeText}>
            {date.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>

      </View>

      {/* iOS Popup-like Picker */}
      {Platform.OS === 'ios' && show ? (
        <Modal
          transparent={true}
          animationType="slide"
          visible={show}
          onRequestClose={handleCancel}
        >
          <View style={styles.iosPickerContainer}>
            <View style={styles.iosPicker}>
              <DateTimePicker
                value={date}
                mode={mode}
                display="inline" // Calendar-style picker
                onChange={onChange}
                minimumDate={currentDate}
                is24Hour={true}
              />
              <View style={styles.iosButtonRow}>
                <Pressable
                  style={styles.iosButtonCancel}
                  onPress={handleCancel}
                >
                  <Text style={styles.iosButtonText}>Batal</Text>
                </Pressable>
                <Pressable
                  style={styles.iosButtonOK}
                  onPress={handleOK}
                >
                  <Text style={styles.iosButtonTextOK}>Teruskan</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}

      {/* Android (Default Behavior) */}
      {Platform.OS === 'android' && show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
          minimumDate={currentDate}
          is24Hour={true}
        />
      )}

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Topik perbincangan ketika sesi temu janji</Text>
      <Text style={styles.subText}>
        Jika tidak berkaitan, sila biarkan ruangan ini kosong*
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Tuliskan di sini ..."
        value={topic}
        onChangeText={setTopic}
        multiline
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} >
          <Text style={styles.buttonText}>Kembali</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.buttonText}>Hantar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
            </KeyboardAvoidingView>
    
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
  },
  dividerTop: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 20
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 20
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    padding: 10,
    marginTop: 30,
    paddingBottom: 0
  },
  title: {
    width: '75%',
    fontSize: isSmallPhone ? 25 : 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e3a5f',

  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0b1c39',
    marginTop: 0,
  },
  subText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f4fa',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#002D72',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    fontSize: 12,
    color: '#888',
  },
  showMore: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#555',
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dateTimeButton: {
    flexDirection: 'row',
    backgroundColor: '#3b588e',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    flex: 0.48,
    justifyContent: 'center',
  },
  dateTimeText: {
    color: 'white',
    marginLeft: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    textAlignVertical: 'top',
    height: 100,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  backButton: {
    backgroundColor: '#cfd9e3',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  submitButton: {
    backgroundColor: '#2d4362',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  iosPickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  iosPicker: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  iosButtonRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  iosButtonCancel: {
    padding: 10,
    marginRight: 10,
  },
  iosButtonText: {
    color: '#36597a',
    fontWeight: 'bold',
  },
  iosButtonOK: {
    padding: 10,
    backgroundColor: '#36597a',
    borderRadius: 5,
  },
  iosButtonTextOK: {
    color: '#fff',
    fontWeight: 'bold',
  },
  counselorList:{
    color: '#cfd9e3',
  }
});
