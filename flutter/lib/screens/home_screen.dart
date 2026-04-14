import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:fitpulse/theme/app_theme.dart';
import 'package:fitpulse/widgets/quick_workout_card.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgDeep,
      appBar: AppBar(
        backgroundColor: AppTheme.bgDeep.withOpacity(0.8),
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('TUESDAY, 14 APR', style: TextStyle(fontSize: 10, color: AppTheme.textSecondary, letterSpacing: 1.5, fontWeight: FontWeight.bold)),
            const Text('Today Snapshot', style: TextStyle(fontSize: 20, color: AppTheme.textPrimary, fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(LucideIcons.search, color: AppTheme.textSecondary), onPressed: () {}),
          IconButton(icon: const Icon(LucideIcons.bell, color: AppTheme.textSecondary), onPressed: () {}),
          const SizedBox(width: 8),
          const CircleAvatar(
            backgroundColor: AppTheme.accent,
            radius: 16,
            child: Text('AS', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome Section
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text('Good afternoon', style: TextStyle(color: AppTheme.textTertiary, fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 1.2)),
                    Text('Abhinav Sai', style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppTheme.accent.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Text('🔥 12-day streak', style: TextStyle(color: AppTheme.accent, fontWeight: FontWeight.bold, fontSize: 12)),
                )
              ],
            ),
            const SizedBox(height: 24),
            
            // Hero Stats Card
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(24),
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [AppTheme.accent.withOpacity(0.15), AppTheme.accent.withOpacity(0.05)],
                ),
                border: Border.all(color: AppTheme.accent.withOpacity(0.1)),
              ),
              child: Row(
                children: [
                  // Fake Progress Ring
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      SizedBox(
                        width: 80,
                        height: 80,
                        child: CircularProgressIndicator(
                          value: 0.75,
                          strokeWidth: 8,
                          backgroundColor: Colors.white.withOpacity(0.05),
                          color: AppTheme.accent,
                        ),
                      ),
                      const Text('75%', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18))
                    ],
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('CALORIES BURNED', style: TextStyle(color: AppTheme.textTertiary, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.5)),
                        Text('1,883', style: TextStyle(color: Colors.white, fontSize: 36, fontWeight: FontWeight.bold)),
                        Text('of 2,500 kcal goal', style: TextStyle(color: AppTheme.textTertiary, fontSize: 12, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  )
                ],
              ),
            ),
            const SizedBox(height: 16),
            
            // Row Stats
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(color: AppTheme.bgCard, borderRadius: BorderRadius.circular(16)),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: const [
                            Icon(LucideIcons.activity, size: 16, color: AppTheme.violet),
                            SizedBox(width: 8),
                            Text('STEPS', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textTertiary, letterSpacing: 1.5)),
                          ],
                        ),
                        const SizedBox(height: 8),
                        const Text('8,412', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(color: AppTheme.bgCard, borderRadius: BorderRadius.circular(16)),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: const [
                            Icon(LucideIcons.timer, size: 16, color: AppTheme.emerald),
                            SizedBox(width: 8),
                            Text('ACTIVE', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textTertiary, letterSpacing: 1.5)),
                          ],
                        ),
                        const SizedBox(height: 8),
                        const Text('48 min', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ),
                )
              ],
            ),
            const SizedBox(height: 24),

            // Quick Workouts Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text('Quick Start', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                Text('Browse All >', style: TextStyle(color: AppTheme.accent, fontSize: 12, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 16),
            
            // Workouts Grid/List
            SizedBox(
              height: 160,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: const [
                  QuickWorkoutCard(title: 'Strength Core', category: 'Strength', duration: '20', color: AppTheme.violet),
                  SizedBox(width: 12),
                  QuickWorkoutCard(title: 'HIIT Burn', category: 'Cardio', duration: '15', color: AppTheme.accentVariant),
                  SizedBox(width: 12),
                  QuickWorkoutCard(title: 'Recovery Yoga', category: 'Yoga', duration: '30', color: AppTheme.emerald),
                ],
              ),
            )
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppTheme.accent,
        onPressed: () {},
        child: const Icon(LucideIcons.sparkles, color: Colors.white),
      ),
    );
  }
}
