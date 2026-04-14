import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:fitpulse/theme/app_theme.dart';
import 'package:fitpulse/screens/home_screen.dart';
import 'package:fitpulse/screens/workouts_screen.dart';
import 'package:fitpulse/screens/activity_screen.dart';
import 'package:fitpulse/screens/nutrition_screen.dart';
import 'package:fitpulse/screens/analytics_screen.dart';
import 'package:fitpulse/screens/goals_screen.dart';
import 'package:fitpulse/screens/profile_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const WorkoutsScreen(),
    const ActivityScreen(),
    const NutritionScreen(),
    const AnalyticsScreen(),
    const GoalsScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgDeep,
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: AppTheme.border, width: 1)),
        ),
        child: BottomNavigationBar(
          backgroundColor: AppTheme.bgRaised,
          type: BottomNavigationBarType.fixed,
          selectedItemColor: AppTheme.accent,
          unselectedItemColor: AppTheme.textSecondary,
          selectedFontSize: 9,
          unselectedFontSize: 9,
          currentIndex: _currentIndex,
          onTap: (i) => setState(() => _currentIndex = i),
          items: const [
            BottomNavigationBarItem(icon: Icon(LucideIcons.home), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(LucideIcons.dumbbell), label: 'Train'),
            BottomNavigationBarItem(icon: Icon(LucideIcons.activity), label: 'Moves'),
            BottomNavigationBarItem(icon: Icon(LucideIcons.salad), label: 'Fuel'),
            BottomNavigationBarItem(icon: Icon(LucideIcons.barChart3), label: 'Stats'),
            BottomNavigationBarItem(icon: Icon(LucideIcons.goal), label: 'Goals'),
            BottomNavigationBarItem(icon: Icon(LucideIcons.user), label: 'Me'),
          ],
        ),
      ),
    );
  }
}

