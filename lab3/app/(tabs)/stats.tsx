import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppState } from '@/context/AppStatusContext'; 
import { Palette } from '@/constants/Colors'; 


interface AchievementProps {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  current: number;
  goal: number;
  completed: boolean;
  theme: any;
  isDark: boolean;
}


const AchievementCard = ({ title, icon, current, goal, completed, theme, isDark }: AchievementProps) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <View style={[styles.cardNode, { backgroundColor: theme.surface, borderColor: theme.outline }]}>
      <View style={styles.cardTop}>
        <View style={[styles.iconBox, { backgroundColor: completed ? theme.success + '20' : theme.accent + '20' }]}>
          <MaterialCommunityIcons 
            name={completed ? "check-decagram" : icon} 
            size={24} 
            color={completed ? theme.success : theme.accent} 
          />
        </View>
        <View style={styles.titleStack}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.cardSubtitle, { color: theme.subText }]}>
            {completed ? 'Місія виконана' : `У процесі: ${current}/${goal}`}
          </Text>
        </View>
      </View>

      <View style={[styles.track, { backgroundColor: isDark ? '#333' : '#E9ECEF' }]}>
        <View 
          style={[
            styles.fill, 
            { width: `${percentage}%`, backgroundColor: completed ? theme.success : theme.accent }
          ]} 
        />
      </View>
    </View>
  );
};

export default function StatisticsScreen() {
  const { progress, points, isDark } = useAppState();
  const theme = isDark ? Palette.dark : Palette.light;

  return (
    <ScrollView 
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={[styles.mainHeader, { color: theme.text }]}>Статус квестів</Text>
        <View style={[styles.badge, { backgroundColor: theme.accent }]}>
          <Text style={styles.badgeText}>{points} XP</Text>
        </View>
      </View>

      <AchievementCard 
        title="Енергійний клікер" 
        icon="fingerprint" 
        current={progress.clicks} 
        goal={10} 
        completed={progress.clicks >= 10} 
        theme={theme}
        isDark={isDark}
      />
      
      <AchievementCard 
        title="Подвійний удар" 
        icon="lightning-bolt" 
        current={progress.doubleHits} 
        goal={5} 
        completed={progress.doubleHits >= 5} 
        theme={theme}
        isDark={isDark}
      />

      <AchievementCard 
        title="Залізна витримка" 
        icon="timer-sand" 
        current={progress.isLongPressed ? 1 : 0} 
        goal={1} 
        completed={progress.isLongPressed} 
        theme={theme}
        isDark={isDark}
      />

      <AchievementCard 
        title="Майстер простору" 
        icon="axis-arrow" 
        current={progress.isMoved ? 1 : 0} 
        goal={1} 
        completed={progress.isMoved} 
        theme={theme}
        isDark={isDark}
      />

      <AchievementCard 
        title="Гроссмейстер" 
        icon="trophy-outline" 
        current={points} 
        goal={500} 
        completed={points >= 500} 
        theme={theme}
        isDark={isDark}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 100, paddingTop: 10 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
  },
  mainHeader: { fontSize: 26, fontWeight: '900' },
  badge: { paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  cardNode: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  titleStack: { marginLeft: 15 },
  cardTitle: { fontSize: 17, fontWeight: '700' },
  cardSubtitle: { fontSize: 13, marginTop: 2 },
  track: { height: 10, borderRadius: 5, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
});