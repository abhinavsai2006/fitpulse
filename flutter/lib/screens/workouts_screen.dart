import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:fitpulse/theme/app_theme.dart';
import 'package:fitpulse/widgets/quick_workout_card.dart';

class WorkoutsScreen extends StatefulWidget {
  const WorkoutsScreen({Key? key}) : super(key: key);

  @override
  State<WorkoutsScreen> createState() => _WorkoutsScreenState();
}

class _WorkoutsScreenState extends State<WorkoutsScreen> {
  String _activeCategory = 'all';
  final List<String> _categories = ['Strength', 'Cardio', 'HIIT', 'Yoga', 'Cycling', 'Swimming'];
  final Map<String, IconData> _categoryIcons = {
    'Strength': LucideIcons.dumbbell,
    'Cardio': LucideIcons.heartPulse,
    'HIIT': LucideIcons.zap,
    'Yoga': LucideIcons.personStanding,
    'Cycling': LucideIcons.bike,
    'Swimming': LucideIcons.waves,
  };

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
            const Text('WORKOUTS', style: TextStyle(fontSize: 10, color: AppTheme.textSecondary, letterSpacing: 1.5, fontWeight: FontWeight.bold)),
            const Text('Explore Sessions', style: TextStyle(fontSize: 20, color: AppTheme.textPrimary, fontWeight: FontWeight.bold)),
          ],
        ),
        actions: [
          IconButton(icon: const Icon(LucideIcons.search, color: AppTheme.textSecondary), onPressed: () {}),
          const SizedBox(width: 8),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Search Bar
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.bgCard,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppTheme.border),
                ),
                child: TextField(
                  style: const TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    icon: const Icon(LucideIcons.search, color: AppTheme.textSecondary, size: 20),
                    hintText: 'Search workouts...',
                    hintStyle: const TextStyle(color: AppTheme.textSecondary),
                    border: InputBorder.none,
                    suffixIcon: Container(
                      margin: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.06),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: const Center(child: Text('24', style: TextStyle(color: AppTheme.textSecondary, fontSize: 10, fontWeight: FontWeight.bold))),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Categories
              SizedBox(
                height: 40,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: [
                    _buildCategoryPill('all', 'All (24)', LucideIcons.flame),
                    ..._categories.map((c) => _buildCategoryPill(c, c, _categoryIcons[c] ?? LucideIcons.dumbbell)),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Workout Grid
              GridView.count(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisCount: 2,
                mainAxisSpacing: 16,
                crossAxisSpacing: 16,
                childAspectRatio: 0.8,
                children: const [
                  QuickWorkoutCard(title: 'Upper Body Blast', category: 'Strength', duration: '45', color: AppTheme.violet),
                  QuickWorkoutCard(title: 'HIIT Cardio Burn', category: 'HIIT', duration: '20', color: AppTheme.accent),
                  QuickWorkoutCard(title: 'Morning Flow', category: 'Yoga', duration: '30', color: AppTheme.emerald),
                  QuickWorkoutCard(title: 'Core Crusher', category: 'Strength', duration: '15', color: AppTheme.sky),
                  QuickWorkoutCard(title: 'Endurance Cycle', category: 'Cycling', duration: '40', color: AppTheme.amber),
                  QuickWorkoutCard(title: 'Recovery Stretch', category: 'Yoga', duration: '20', color: AppTheme.violet),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCategoryPill(String id, String label, IconData icon) {
    bool isActive = _activeCategory == id;
    return GestureDetector(
      onTap: () => setState(() => _activeCategory = id),
      child: Container(
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isActive ? AppTheme.accent.withOpacity(0.15) : AppTheme.bgCard,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: isActive ? AppTheme.accent.withOpacity(0.3) : AppTheme.border),
        ),
        child: Row(
          children: [
            if (id != 'all') ...[
              Icon(icon, size: 14, color: isActive ? AppTheme.accent : AppTheme.textSecondary),
              const SizedBox(width: 8),
            ],
            Text(label, style: TextStyle(
              color: isActive ? AppTheme.accent : AppTheme.textSecondary,
              fontWeight: FontWeight.bold,
              fontSize: 12,
            )),
          ],
        ),
      ),
    );
  }
}
